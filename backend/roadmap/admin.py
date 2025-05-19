from django.contrib import admin
from .models import Skill, Resource, Roadmap, RoadmapSkill, Progress

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty_level', 'estimated_time')
    search_fields = ('name', 'description')
    filter_horizontal = ('prerequisites', 'learning_resources')

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'difficulty_level', 'estimated_time')
    list_filter = ('resource_type', 'difficulty_level')
    search_fields = ('title', 'url')
    filter_horizontal = ('prerequisites',)

@admin.register(Roadmap)
class RoadmapAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at')
    search_fields = ('title', 'description')

@admin.register(RoadmapSkill)
class RoadmapSkillAdmin(admin.ModelAdmin):
    list_display = ('roadmap', 'skill', 'order', 'completed')
    list_filter = ('completed',)
    search_fields = ('roadmap__title', 'skill__name')

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ('roadmap', 'skill', 'last_updated', 'time_spent')
    search_fields = ('roadmap__title', 'skill__name', 'notes')
    filter_horizontal = ('completed_resources',)
