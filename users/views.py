from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from school.models import User, Student, Teacher, Parent, Administrator, FinanceOffice
import json

@csrf_exempt
def userprofile_list(request):
	if request.method == 'GET':
		users = User.objects.all()
		data = [
			{
				'id': u.id,
				'username': u.username,
				'email': u.email,
				'role': u.role,
			} for u in users
		]
		return JsonResponse(data, safe=False)
	elif request.method == 'POST':
		body = json.loads(request.body)
		if User.objects.filter(username=body['username']).exists():
			return JsonResponse({'error': 'Username already exists'}, status=400)
		role = body.get('role', 'student')
		user = User.objects.create_user(
			username=body['username'],
			email=body.get('email', ''),
			password=body.get('password', '1234'),
			role=role
		)
		profile_id = None
		if role == 'student':
			profile = Student.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'teacher':
			profile = Teacher.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'parent':
			profile = Parent.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'admin' or role == 'administrator':
			profile = Administrator.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'finance':
			profile = FinanceOffice.objects.create(user=user)
			profile_id = profile.user_id
		return JsonResponse({'id': profile_id, 'username': user.username, 'role': user.role})

# Create your views here.

# Signup view
from django.contrib.auth import authenticate, login
@csrf_exempt
def signup_view(request):
	if request.method == 'POST':
		body = json.loads(request.body)
		if User.objects.filter(username=body['username']).exists():
			return JsonResponse({'error': 'Username already exists'}, status=400)
		role = body.get('role', 'student')
		user = User.objects.create_user(
			username=body['username'],
			email=body.get('email', ''),
			password=body.get('password', '1234'),
			role=role
		)
		# Crée le profil selon le rôle
		profile_id = None
		if role == 'student':
			profile = Student.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'teacher':
			profile = Teacher.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'parent':
			profile = Parent.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'admin' or role == 'administrator':
			profile = Administrator.objects.create(user=user)
			profile_id = profile.user_id
		elif role == 'finance':
			profile = FinanceOffice.objects.create(user=user)
			profile_id = profile.user_id
		return JsonResponse({'id': profile_id, 'username': user.username, 'role': user.role})
	return JsonResponse({'error': 'Invalid method'}, status=405)

# Login view
@csrf_exempt
def login_view(request):
	if request.method == 'POST':
		body = json.loads(request.body)
		user = authenticate(username=body.get('username'), password=body.get('password'))
		if user is not None:
			login(request, user)
			return JsonResponse({'success': True, 'username': user.username, 'role': user.role})
		else:
			return JsonResponse({'success': False, 'error': 'Invalid credentials'}, status=401)
	return JsonResponse({'error': 'Invalid method'}, status=405)
