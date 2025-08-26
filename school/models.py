from django.db import models
from django.contrib.auth.models import AbstractUser

# User model
class User(AbstractUser):
	role = models.CharField(max_length=20, choices=[
		('student', 'Student'),
		('teacher', 'Teacher'),
		('parent', 'Parent'),
		('admin', 'Administrator'),
		('finance', 'FinanceOffice'),
	], default='student')

# ClassRoom
class ClassRoom(models.Model):
	className = models.CharField(max_length=100)

	def __str__(self):
		return self.className 

# Subject
class Subject(models.Model):
	subjectName = models.CharField(max_length=100)

	def __str__(self):
		return self.subjectName

# Grade
class Grade(models.Model):
	student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='grades')
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	score = models.FloatField()
	comment = models.TextField(blank=True)

	def __str__(self):
		return f"{self.student.user.username} - {self.subject.subjectName}: {self.score}"

# Assignment
class Assignment(models.Model):
	subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)

	def __str__(self):
		return self.title

# Attendance
class Attendance(models.Model):
	student = models.ForeignKey('Student', on_delete=models.CASCADE, related_name='attendances')
	date = models.DateField()
	status = models.CharField(max_length=20)

	def __str__(self):
		return f"{self.student.user.username} - {self.date}: {self.status}"

# Notification
class Notification(models.Model):
	message = models.TextField()
	date = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')

	def __str__(self):
		return f"{self.user.username}: {self.message[:30]}"

# Student
class Student(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
	classroom = models.ForeignKey(ClassRoom, on_delete=models.SET_NULL, null=True, blank=True)

	def __str__(self):
		return self.user.username

# Teacher
class Teacher(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
	classroom = models.ManyToManyField(ClassRoom, blank=True)
	subjects = models.ManyToManyField(Subject, blank=True)

	def __str__(self):
		return self.user.username

# Parent
class Parent(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
	students = models.ManyToManyField(Student, blank=True)

	def __str__(self):
		return self.user.username

# Administrator
class Administrator(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

	def __str__(self):
		return self.user.username

# FinanceOffice
class FinanceOffice(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

	def __str__(self):
		return self.user.username

# Create your models here.
