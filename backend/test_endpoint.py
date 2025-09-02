import requests
import json

def test_registration():
    url = "http://localhost:8000/api/auth/register/"
    headers = {
        'Content-Type': 'application/json',
    }
    data = {
        "email": "test@example.com",
        "first_name": "Test",
        "last_name": "User",
        "password": "testpass123",
        "password2": "testpass123"
    }
    
    try:
        print(f"Sending POST request to {url}")
        print(f"Data: {json.dumps(data, indent=2)}")
        
        response = requests.post(url, headers=headers, json=data, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        try:
            print("Response:", response.json())
        except json.JSONDecodeError:
            print("Response Text:", response.text)
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_registration()
