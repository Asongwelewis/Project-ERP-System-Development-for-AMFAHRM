import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_django.settings')
django.setup()

# Now we can import Django models
from django.db import connection

try:
    # Try to connect to the database
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        one = cursor.fetchone()[0]
        if one == 1:
            print("✅ Database connection successful!")
        else:
            print("❌ Database connection failed!")
except Exception as e:
    print(f"❌ Database connection error: {e}")

# Check if we can query the User model
try:
    from django.contrib.auth import get_user_model
    User = get_user_model()
    count = User.objects.count()
    print(f"✅ Found {count} users in the database")
except Exception as e:
    print(f"❌ Error querying User model: {e}")
