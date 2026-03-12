from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Skill, Resource, Roadmap, RoadmapSkill, Progress
from .serializers import (
    SkillSerializer, ResourceSerializer, RoadmapSerializer,
    RoadmapSkillSerializer, ProgressSerializer, UserRegistrationSerializer, UserSerializer
)
from .services import RoadmapGenerator
from rest_framework.permissions import AllowAny
from django.utils import timezone

# Create your views here.

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Resource.objects.all()
        skill_id = self.request.query_params.get('skill_id', None)
        resource_type = self.request.query_params.get('type', None)
        difficulty = self.request.query_params.get('difficulty', None)

        if skill_id:
            queryset = queryset.filter(prerequisites__id=skill_id)
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        return queryset.distinct()

class RoadmapViewSet(viewsets.ModelViewSet):
    serializer_class = RoadmapSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Roadmap.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def complete_skill(self, request, pk=None, skill_id=None):
        roadmap = self.get_object()
        roadmap_skill = get_object_or_404(RoadmapSkill, roadmap=roadmap, id=request.data.get('skill_id'))
        roadmap_skill.completed = not roadmap_skill.completed
        roadmap_skill.save()

        # If any skill is not completed, set roadmap.completed = False; else True
        if not RoadmapSkill.objects.filter(roadmap=roadmap, completed=False).exists():
            roadmap.completed = True
        else:
            roadmap.completed = False
        roadmap.save()

        return Response({'status': 'skill updated'})

    @action(detail=True, methods=['post'])
    def add_note(self, request, pk=None, skill_id=None):
        roadmap = self.get_object()
        roadmap_skill = get_object_or_404(RoadmapSkill, roadmap=roadmap, id=skill_id)
        note = request.data.get('content')
        if not note:
            return Response({'error': 'Note content is required'}, status=400)
        
        notes = roadmap_skill.notes or []
        notes.append({
            'id': len(notes) + 1,
            'content': note,
            'created_at': timezone.now().isoformat()
        })
        roadmap_skill.notes = notes
        roadmap_skill.save()
        return Response({'status': 'note added'})

    @action(detail=True, methods=['post'], url_path=r'skills/(?P<skill_id>[^/.]+)/notes')
    def add_skill_note(self, request, pk=None, skill_id=None):
        return self.add_note(request, pk=pk, skill_id=skill_id)

    @action(detail=True, methods=['delete'], url_path=r'skills/(?P<skill_id>[^/.]+)/notes/(?P<note_id>[^/.]+)')
    def delete_skill_note(self, request, pk=None, skill_id=None, note_id=None):
        roadmap = self.get_object()
        roadmap_skill = get_object_or_404(RoadmapSkill, roadmap=roadmap, id=skill_id)
        notes = roadmap_skill.notes or []
        updated_notes = [note for note in notes if str(note.get('id')) != str(note_id)]

        if len(updated_notes) == len(notes):
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)

        roadmap_skill.notes = updated_notes
        roadmap_skill.save()
        return Response({'status': 'note deleted'})

    @action(detail=True, methods=['post'])
    def complete_all_skills(self, request, pk=None):
        roadmap = self.get_object()
        skills = RoadmapSkill.objects.filter(roadmap=roadmap)
        skills.update(completed=True)
        roadmap.completed = True
        roadmap.save()
        return Response({'status': 'all skills marked as completed'})

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def generate(self, request):
        """Generate a personalized roadmap based on user inputs."""
        category = request.data.get('category')
        resource_types = request.data.get('resource_types', [])
        current_level = request.data.get('current_level', 'beginner')
        target_level = request.data.get('target_level', None)
        timeline = request.data.get('timeline', 4)  # in weeks
        hours_per_week = request.data.get('hours_per_week', 5)
        title = request.data.get('title', 'My Learning Roadmap')
        description = request.data.get('description', '')

        try:
            generator = RoadmapGenerator(
                user=request.user,
                category=category,
                resource_types=resource_types,
                current_level=current_level,
                target_level=target_level,
                timeline=timeline,
                hours_per_week=hours_per_week
            )
            roadmap = generator.generate_roadmap(title, description)
            serializer = self.get_serializer(roadmap)
            data = serializer.data
            if hasattr(roadmap, '_target_unreachable'):
                data['target_unreachable'] = roadmap._target_unreachable
            return Response(data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Calculate estimated_weeks for this roadmap
        roadmap_skills = instance.roadmapskill_set.all()
        if roadmap_skills:
            first_start = min(rs.start_date for rs in roadmap_skills if rs.start_date)
            last_end = max(rs.end_date for rs in roadmap_skills if rs.end_date)
            estimated_weeks = ((last_end - first_start).days // 7) + 1
        else:
            estimated_weeks = 0
        instance._estimated_weeks = estimated_weeks
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class ProgressViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Progress.objects.filter(roadmap__user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_completed_resource(self, request, pk=None):
        progress = self.get_object()
        resource_id = request.data.get('resource_id')
        time_spent = request.data.get('time_spent', 0)

        if not resource_id:
            return Response(
                {'error': 'Resource ID is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        resource = get_object_or_404(Resource, id=resource_id)
        progress.completed_resources.add(resource)
        progress.time_spent += time_spent
        progress.save()
        
        serializer = self.get_serializer(progress)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    try:
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Endpoint to get current user info
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
