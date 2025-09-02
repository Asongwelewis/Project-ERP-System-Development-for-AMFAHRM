import requests
import json

url = "http://localhost:8000/api/auth/register/"
payload = {
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
}
headers = {
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(f"Status Code: {response.status_code}")
print("Response:", response.json())
