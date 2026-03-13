from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Roadmap, RoadmapSkill, Skill


class AuthAndRoadmapApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="alice",
            email="alice@example.com",
            password="StrongPass123!",
            first_name="Alice",
            last_name="Walker",
        )
        self.token = Token.objects.create(user=self.user)
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Token {self.token.key}"}

    def test_register_login_and_current_user_flow(self):
        payload = {
            "username": "bob",
            "email": "bob@example.com",
            "password": "StrongPass123!",
            "first_name": "Bob",
            "last_name": "Builder",
            "profile": {
                "learning_goals": "Become full-stack developer",
                "experience_level": "beginner",
            },
        }
        register_response = self.client.post("/api/register/", payload, format="json")
        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

        login_response = self.client.post(
            "/api/token-auth/",
            {"username": payload["username"], "password": payload["password"]},
            format="json",
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("token", login_response.data)

        current_user_response = self.client.get(
            "/api/user/",
            HTTP_AUTHORIZATION=f"Token {login_response.data['token']}",
        )
        self.assertEqual(current_user_response.status_code, status.HTTP_200_OK)
        self.assertEqual(current_user_response.data["username"], payload["username"])
        self.assertEqual(current_user_response.data["first_name"], payload["first_name"])
        self.assertEqual(current_user_response.data["last_name"], payload["last_name"])

    def test_roadmap_note_add_and_delete(self):
        skill = Skill.objects.create(
            name="Intro Python",
            description="Basics",
            difficulty_level=1,
            estimated_time=2,
            category="Python",
        )
        roadmap = Roadmap.objects.create(
            user=self.user,
            title="Python Plan",
            description="Learn Python",
            current_level="beginner",
            target_level="intermediate",
            timeline=4,
            hours_per_week=5,
        )
        roadmap_skill = RoadmapSkill.objects.create(roadmap=roadmap, skill=skill, order=1)

        add_note_response = self.client.post(
            f"/api/roadmaps/{roadmap.id}/skills/{roadmap_skill.id}/notes/",
            {"content": "Start with syntax and loops"},
            format="json",
            **self.auth_headers,
        )
        self.assertEqual(add_note_response.status_code, status.HTTP_200_OK)

        roadmap_skill.refresh_from_db()
        self.assertEqual(len(roadmap_skill.notes), 1)
        note_id = roadmap_skill.notes[0]["id"]

        delete_note_response = self.client.delete(
            f"/api/roadmaps/{roadmap.id}/skills/{roadmap_skill.id}/notes/{note_id}/",
            **self.auth_headers,
        )
        self.assertEqual(delete_note_response.status_code, status.HTTP_200_OK)

        roadmap_skill.refresh_from_db()
        self.assertEqual(roadmap_skill.notes, [])
