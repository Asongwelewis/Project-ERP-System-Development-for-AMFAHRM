import os
import sys
import django

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
import json

class RegistrationTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.register_url = reverse('register')
        self.user_data = {
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpass123',
            'password2': 'testpass123'
        }

    def test_registration_view(self):
        print("\n=== Testing Registration View ===")
        
        # Test GET request
        print("Testing GET request...")
        response = self.client.get(self.register_url)
        print(f"GET Status Code: {response.status_code}")
        
        # Test POST request with valid data
        print("\nTesting POST request with valid data...")
        response = self.client.post(
            self.register_url,
            data=json.dumps(self.user_data),
            content_type='application/json'
        )
        print(f"POST Status Code: {response.status_code}")
        print(f"Response: {response.json() if hasattr(response, 'json') else response.content}")
        
        # Verify user was created
        user_model = get_user_model()
        user_exists = user_model.objects.filter(email=self.user_data['email']).exists()
        print(f"User created in database: {user_exists}")
        
        # Test POST request with invalid data
        print("\nTesting POST request with invalid data...")
        invalid_data = self.user_data.copy()
        invalid_data['password2'] = 'mismatchedpassword'
        response = self.client.post(
            self.register_url,
            data=json.dumps(invalid_data),
            content_type='application/json'
        )
        print(f"Invalid data Status Code: {response.status_code}")
        print(f"Error Response: {response.json() if hasattr(response, 'json') else response.content}")

if __name__ == "__main__":
    import unittest
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
