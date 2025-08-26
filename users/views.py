from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import UserProfile
import json

@csrf_exempt
def userprofile_list(request):
	if request.method == 'GET':
		profiles = UserProfile.objects.select_related('user').all()
		data = [
			{
				'id': p.id,
				'username': p.user.username,
				'email': p.user.email,
				'phone': p.phone,
				'address': p.address,
				'role': p.role,
			} for p in profiles
		]
		return JsonResponse(data, safe=False)
	elif request.method == 'POST':
		body = json.loads(request.body)
		user = User.objects.create_user(username=body['username'], email=body.get('email', ''), password=body.get('password', '1234'))
		profile = UserProfile.objects.create(user=user, phone=body.get('phone', ''), address=body.get('address', ''), role=body.get('role', 'student'))
		return JsonResponse({'id': profile.id, 'username': user.username, 'role': profile.role})

# Create your views here.
