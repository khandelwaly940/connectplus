from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'skills', views.SkillViewSet)
router.register(r'resources', views.ResourceViewSet)
router.register(r'roadmaps', views.RoadmapViewSet, basename='roadmap')
# router.register(r'roadmap-skills', views.RoadmapSkillViewSet)  # Removed, not implemented
router.register(r'progress', views.ProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register_user, name='register'),
    path('user/', views.current_user, name='current_user'),
] 