import os
import sys
import django

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.serializers import UserCreateSerializer

def test_registration():
    print("=== Testing User Registration ===\n")
    
    # Test data
    user_data = {
        'email': 'test@example.com',
        'first_name': 'Test',
        'last_name': 'User',
        'password': 'testpass123',
        'password2': 'testpass123'
    }
    
    # Test serializer
    print("1. Testing serializer...")
    serializer = UserCreateSerializer(data=user_data)
    is_valid = serializer.is_valid()
    print(f"   - Is valid: {is_valid}")
    
    if not is_valid:
        print(f"   - Errors: {serializer.errors}")
        return
    
    # Save user
    print("\n2. Saving user...")
    try:
        user = serializer.save()
        print(f"   - User created successfully! ID: {user.id}")
        print(f"   - Email: {user.email}")
        print(f"   - Name: {user.first_name} {user.last_name}")
    except Exception as e:
        print(f"   - Error saving user: {e}")
        return
    
    # Verify user in database
    print("\n3. Verifying user in database...")
    User = get_user_model()
    try:
        db_user = User.objects.get(email=user_data['email'])
        print(f"   - User found in database!")
        print(f"   - ID: {db_user.id}")
        print(f"   - Email: {db_user.email}")
        print(f"   - Is active: {db_user.is_active}")
        print(f"   - Date joined: {db_user.date_joined}")
    except User.DoesNotExist:
        print("   - Error: User not found in database")
    except Exception as e:
        print(f"   - Error querying database: {e}")

if __name__ == "__main__":
    test_registration()
