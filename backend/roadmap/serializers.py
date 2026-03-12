from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Skill, Resource, Roadmap, RoadmapSkill, Progress, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'resource_type', 'difficulty_level', 'estimated_time']

class SkillSerializer(serializers.ModelSerializer):
    learning_resources = ResourceSerializer(many=True, read_only=True)
    prerequisites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Skill
        fields = ['id', 'name', 'description', 'difficulty_level', 'estimated_time', 'category', 'learning_resources', 'prerequisites']

class RoadmapSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)
    resources = ResourceSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = RoadmapSkill
        fields = ['id', 'skill', 'completed', 'notes', 'resources', 'order', 'start_date', 'end_date', 'progress']

    def get_progress(self, obj):
        try:
            progress = Progress.objects.get(roadmap=obj.roadmap, skill=obj.skill)
            return {
                'completed_resources': ResourceSerializer(progress.completed_resources.all(), many=True).data,
                'time_spent': progress.time_spent,
                'notes': progress.notes
            }
        except Progress.DoesNotExist:
            return None

class RoadmapSerializer(serializers.ModelSerializer):
    skills = RoadmapSkillSerializer(source='roadmapskill_set', many=True, read_only=True)
    preferred_resources = ResourceSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    target_unreachable = serializers.SerializerMethodField()
    estimated_weeks = serializers.SerializerMethodField()

    class Meta:
        model = Roadmap
        fields = [
            'id', 'title', 'description', 'current_level', 'target_level',
            'timeline', 'hours_per_week', 'preferred_resources', 'skills', 'user',
            'created_at', 'updated_at', 'completed', 'target_unreachable', 'estimated_weeks'
        ]

    def get_target_unreachable(self, obj):
        target_level = obj.target_level
        skills = obj.roadmapskill_set.all()
        if not skills:
            return True
        level_map = {'beginner': 1, 'intermediate': 2, 'advanced': 3, 'master': 4}
        target_level_value = level_map.get(str(target_level).lower())
        return not any(
            s.skill.difficulty_level == target_level_value
            for s in skills
        )

    def get_estimated_weeks(self, obj):
        return getattr(obj, '_estimated_weeks', None)

class ProgressSerializer(serializers.ModelSerializer):
    completed_resources = ResourceSerializer(many=True, read_only=True)
    skill = SkillSerializer(read_only=True)

    class Meta:
        model = Progress
        fields = ['id', 'skill', 'completed_resources', 'notes', 'time_spent', 'last_updated']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['learning_goals', 'experience_level']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile = UserProfileSerializer()
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
        )
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({'username': 'Username already exists'})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'Email already exists'})
        return data 
