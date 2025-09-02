from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.test import RequestFactory
from ...views_auth import RegisterView
import json

class Command(BaseCommand):
    help = 'Test the registration functionality directly'

    def handle(self, *args, **options):
        print("=== Testing Registration Functionality ===\n")
        
        # Create a test request
        factory = RequestFactory()
        data = {
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testpass123',
            'password2': 'testpass123'
        }
        
        # Create a POST request
        request = factory.post(
            '/api/auth/register/',
            data=json.dumps(data),
            content_type='application/json'
        )
        
        # Call the view directly
        view = RegisterView.as_view()
        response = view(request)
        
        # Print the response
        print(f"Status Code: {response.status_code}")
        print("Response Data:", response.data if hasattr(response, 'data') else "No response data")
        
        # Check if user was created
        User = get_user_model()
        user_exists = User.objects.filter(email=data['email']).exists()
        print(f"\nUser created in database: {user_exists}")
        
        if user_exists:
            user = User.objects.get(email=data['email'])
            print(f"User details: {user.email}, {user.first_name} {user.last_name}")
        
        print("\n=== Test Complete ===")
