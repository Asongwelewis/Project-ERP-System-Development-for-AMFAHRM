# --- Endpoints étudiants ---
from django.http import JsonResponse
from .models import Student, Grade, Assignment, Subject, Attendance, ClassRoom
from django.views.decorators.csrf import csrf_exempt

def get_student_courses(request, student_id):
	try:
		student = Student.objects.get(pk=student_id)
		courses = []
		if student.classroom:
			subjects = Subject.objects.all()  # à adapter selon la logique métier
			for subj in subjects:
				courses.append({
					'id': subj.id,
					'name': subj.subjectName,
				})
		return JsonResponse(courses, safe=False)
	except Student.DoesNotExist:
		return JsonResponse({'error': 'Student not found'}, status=404)

def get_student_assignments(request, student_id):
	try:
		student = Student.objects.get(pk=student_id)
		assignments = Assignment.objects.filter(subject__in=Subject.objects.all())  # à adapter
		data = [
			{
				'id': a.id,
				'title': a.title,
				'subject': a.subject.subjectName,
			} for a in assignments
		]
		return JsonResponse(data, safe=False)
	except Student.DoesNotExist:
		return JsonResponse({'error': 'Student not found'}, status=404)

def get_student_exams(request, student_id):
	# Placeholder: à adapter selon la logique métier
	return JsonResponse([], safe=False)

def get_student_grades(request, student_id):
	try:
		student = Student.objects.get(pk=student_id)
		grades = Grade.objects.filter(student=student)
		data = [
			{
				'subject': g.subject.subjectName,
				'score': g.score,
				'comment': g.comment,
			} for g in grades
		]
		return JsonResponse(data, safe=False)
	except Student.DoesNotExist:
		return JsonResponse({'error': 'Student not found'}, status=404)

def get_student_schedule(request, student_id):
	# Placeholder: à adapter selon la logique métier
	return JsonResponse([], safe=False)
from django.shortcuts import render

# Create your views here.
