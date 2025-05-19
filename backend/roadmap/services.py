from datetime import datetime, timedelta
from typing import List, Dict
from .models import Skill, Resource, Roadmap, RoadmapSkill

class RoadmapGenerator:
    def __init__(self, user, category=None, resource_types=None, current_level=None, target_level=None, timeline=None, hours_per_week=5, **kwargs):
        self.user = user
        self.category = category
        self.resource_types = resource_types or []
        self.current_level = current_level
        self.target_level = target_level
        self.timeline = timeline  # in weeks
        self.hours_per_week = int(hours_per_week) if hours_per_week else 5

    def _build_skill_graph(self, skills) -> Dict[int, List[int]]:
        """Build a directed graph of skill dependencies for a set of skills."""
        graph = {}
        for skill in skills:
            graph[skill.id] = [prereq.id for prereq in skill.prerequisites.all()]
        return graph

    def _topological_sort(self, graph: Dict[int, List[int]]) -> List[int]:
        visited = set()
        temp = set()
        order = []
        def visit(node):
            if node in temp:
                raise ValueError("Circular dependency detected")
            if node in visited:
                return
            temp.add(node)
            for neighbor in graph.get(node, []):
                visit(neighbor)
            temp.remove(node)
            visited.add(node)
            order.append(node)
        for node in graph:
            if node not in visited:
                visit(node)
        return order

    def _get_level_value(self, level: str) -> int:
        levels = {'beginner': 1, 'intermediate': 2, 'advanced': 3, 'master': 4}
        return levels.get(level, 1)

    def _get_level_name(self, level: int) -> str:
        levels = {1: 'beginner', 2: 'intermediate', 3: 'advanced', 4: 'master'}
        return levels.get(level, 'beginner')

    def _match_resources(self, skill: Skill) -> List[Resource]:
        # Filter by resource_types and difficulty
        resources = Resource.objects.filter(
            prerequisites__in=[skill],
            difficulty_level__lte=self._get_level_value(skill.difficulty_level)
        )
        if self.resource_types:
            resources = resources.filter(resource_type__in=self.resource_types)
        return list(resources.distinct())[:3]

    def _estimate_completion_time(self, skill: Skill) -> int:
        resources = self._match_resources(skill)
        if not resources:
            return skill.estimated_time
        total_time = sum(resource.estimated_time for resource in resources)
        difficulty_factor = self._get_level_value(skill.difficulty_level) / 2
        return int(total_time * difficulty_factor)

    def _collect_all_prereqs(self, skill, collected=None):
        if collected is None:
            collected = set()
        for prereq in skill.prerequisites.all():
            if prereq.id not in collected:
                collected.add(prereq.id)
                self._collect_all_prereqs(prereq, collected)
        return collected

    def generate_roadmap(self, title: str, description: str) -> Roadmap:
        # Get all skills in the selected category
        all_skills = Skill.objects.filter(category=self.category)
        # Filter by current and target level (inclusive)
        if self.current_level and hasattr(self, 'target_level') and self.target_level:
            min_level = self._get_level_value(self.current_level)
            max_level = self._get_level_value(self.target_level)
            needed_skills = all_skills.filter(difficulty_level__gte=min_level, difficulty_level__lte=max_level)
        else:
            needed_skills = all_skills

        # Build skill graph and sort (only for skills in range)
        skill_graph = self._build_skill_graph(needed_skills)
        sorted_skills = self._topological_sort(skill_graph)
        skills_in_order = [Skill.objects.get(id=sid) for sid in sorted_skills]

        # Timeline logic: only include skills that fit within total available time
        total_hours = (self.timeline or 4) * self.hours_per_week
        selected_skills = []
        included_skill_ids = set()
        used_hours = 0

        def add_with_prereqs(skill):
            nonlocal used_hours
            # Add prerequisites first
            for prereq in skill.prerequisites.all():
                if prereq.id not in included_skill_ids:
                    add_with_prereqs(prereq)
            # Add this skill if not already included and if it fits
            if skill.id not in included_skill_ids:
                est_time = self._estimate_completion_time(skill)
                if used_hours + est_time > total_hours:
                    return False
                selected_skills.append(skill)
                included_skill_ids.add(skill.id)
                used_hours += est_time
            return True

        for skill in skills_in_order:
            if skill.id in included_skill_ids:
                continue
            # Try to add this skill and its prerequisites
            add_with_prereqs(skill)
            if used_hours >= total_hours:
                break

        # Final list in topological order
        final_skills_sorted = [s for s in skills_in_order if s.id in included_skill_ids]

        if not final_skills_sorted:
            raise Exception("No roadmap could be generated for this input. Please change your timeline or other options.")

        # Check if target level is unreachable
        target_level_value = self._get_level_value(self.target_level)
        target_unreachable = not any(self._get_level_value(s.difficulty_level) == target_level_value for s in final_skills_sorted)

        # Create the roadmap
        target_level_str = self.target_level or 'beginner'
        roadmap = Roadmap.objects.create(
            user=self.user,
            title=title,
            description=description,
            current_level=self.current_level,
            target_level=target_level_str,
            timeline=self.timeline,
            hours_per_week=self.hours_per_week
        )
        # Add skills to roadmap
        total_time = 0
        skill_order = []
        for skill in final_skills_sorted:
            estimated_time = self._estimate_completion_time(skill)
            total_time += estimated_time
            skill_order.append((skill, estimated_time))
        total_hours = (self.timeline or 4) * self.hours_per_week
        current_date = datetime.now().date()
        roadmap_skills = []
        for order, (skill, estimated_time) in enumerate(skill_order, 1):
            weeks_needed = max(1, round(estimated_time / total_hours)) if total_hours else 1
            start_date = current_date
            end_date = start_date + timedelta(weeks=weeks_needed)
            roadmap_skill = RoadmapSkill.objects.create(
                roadmap=roadmap,
                skill=skill,
                order=order,
                start_date=start_date,
                end_date=end_date
            )
            resources = self._match_resources(skill)
            if resources:
                roadmap_skill.resources.set(resources)
            current_date = end_date + timedelta(days=1)
            roadmap_skills.append(roadmap_skill)
        # Attach custom attribute for serializer/view
        roadmap._target_unreachable = target_unreachable
        # Calculate estimated_weeks
        if roadmap_skills:
            first_start = min(rs.start_date for rs in roadmap_skills if rs.start_date)
            last_end = max(rs.end_date for rs in roadmap_skills if rs.end_date)
            estimated_weeks = ((last_end - first_start).days // 7) + 1
        else:
            estimated_weeks = 0
        roadmap._estimated_weeks = estimated_weeks
        return roadmap 