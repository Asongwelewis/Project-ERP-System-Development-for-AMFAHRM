from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class UserProfile(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	phone = models.CharField(max_length=20, blank=True)
	address = models.CharField(max_length=255, blank=True)
	role = models.CharField(max_length=50, choices=[('student', 'Student'), ('teacher', 'Teacher'), ('admin', 'Admin')], default='student')

	def __str__(self):
		return f"{self.user.username} ({self.role})"

# Create your models here.
