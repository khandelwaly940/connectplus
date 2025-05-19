from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    difficulty_level = models.IntegerField(choices=[(1, 'Beginner'), (2, 'Intermediate'), (3, 'Advanced'), (4, 'Master')])
    estimated_time = models.IntegerField(help_text='Estimated time in hours')
    prerequisites = models.ManyToManyField('self', symmetrical=False, blank=True, related_name='dependent_skills')
    category = models.CharField(max_length=50, blank=True)
    learning_resources = models.ManyToManyField('Resource', blank=True)

    def __str__(self):
        return self.name

class Resource(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField()
    resource_type = models.CharField(max_length=50, choices=[
        ('video', 'Video'),
        ('article', 'Article'),
        ('course', 'Course'),
        ('book', 'Book'),
    ])
    difficulty_level = models.IntegerField(choices=[(1, 'Beginner'), (2, 'Intermediate'), (3, 'Advanced'), (4, 'Master')])
    estimated_time = models.IntegerField(help_text='Estimated time in hours', default=1)
    prerequisites = models.ManyToManyField(Skill, related_name='required_resources')

    def __str__(self):
        return self.title

class Roadmap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roadmaps')
    title = models.CharField(max_length=200)
    description = models.TextField()
    target_skills = models.ManyToManyField(Skill, through='RoadmapSkill')
    current_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('master', 'Master'),
    ])
    target_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('master', 'Master'),
    ])
    timeline = models.IntegerField(help_text='Timeline in weeks', default=4)
    preferred_resources = models.ManyToManyField(Resource, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    hours_per_week = models.IntegerField(default=5, help_text='Hours per week user plans to study')

    def __str__(self):
        return self.title

class RoadmapSkill(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    notes = models.JSONField(default=list)
    resources = models.ManyToManyField(Resource)
    order = models.IntegerField(default=0)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        unique_together = ['roadmap', 'skill']

    def __str__(self):
        return f"{self.roadmap.title} - {self.skill.name}"

class Progress(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    completed_resources = models.ManyToManyField(Resource)
    notes = models.TextField(blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    time_spent = models.IntegerField(default=0, help_text='Time spent in minutes')

    class Meta:
        unique_together = ['roadmap', 'skill']

    def __str__(self):
        return f"{self.roadmap.title} - {self.skill.name} Progress"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    learning_goals = models.TextField()
    experience_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('master', 'Master'),
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
