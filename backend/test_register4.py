import sys
import os
import django
import requests
import json

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

# Now we can import Django models
from django.contrib.auth import get_user_model
from django.db import connection

def test_database_connection():
    print("\n=== Testing Database Connection ===")
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            one = cursor.fetchone()[0]
            if one == 1:
                print("✅ Database connection successful!")
                return True
            else:
                print("❌ Database connection failed!")
                return False
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return False

def test_user_model():
    print("\n=== Testing User Model ===")
    try:
        User = get_user_model()
        count = User.objects.count()
        print(f"✅ Found {count} users in the database")
        return True
    except Exception as e:
        print(f"❌ Error querying User model: {e}")
        return False

def test_registration():
    print("\n=== Testing Registration Endpoint ===")
    url = "http://localhost:8000/api/auth/register/"
    payload = {
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "User",
        "password": "testpass123",
        "password2": "testpass123"
    }
    headers = {
        'Content-Type': 'application/json'
    }
    
    try:
        print("Sending registration request...")
        response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=10)
        print(f"Status Code: {response.status_code}")
        try:
            print("Response JSON:", response.json())
        except json.JSONDecodeError:
            print("Response Text:", response.text)
        return response.status_code == 201
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return False

if __name__ == "__main__":
    print("\n=== Starting Tests ===")
    
    # Test database connection
    db_ok = test_database_connection()
    
    # Test User model
    user_model_ok = test_user_model()
    
    # Only test registration if database is accessible
    if db_ok and user_model_ok:
        registration_ok = test_registration()
    else:
        print("\n⚠️  Skipping registration test due to database issues")
    
    print("\n=== Test Summary ===")
    print(f"Database Connection: {'✅' if db_ok else '❌'}")
    print(f"User Model Access: {'✅' if user_model_ok else '❌'}")
    if db_ok and user_model_ok:
        print(f"Registration Endpoint: {'✅' if registration_ok else '❌'}")
