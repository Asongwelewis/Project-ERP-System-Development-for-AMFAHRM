import requests
import json

def test_registration():
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
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        print(f"Status Code: {response.status_code}")
        try:
            print("Response JSON:", response.json())
        except json.JSONDecodeError:
            print("Response Text:", response.text)
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_registration()
