from django.db import models
from django.contrib.auth.models import AbstractUser

# ----------------------------
# USER SYSTEM
# ----------------------------
class User(AbstractUser):
    # AbstractUser possède déjà username, password, email, first_name, last_name
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def manage_session(self):
        pass

    def login(self):
        pass

    def logout(self):
        pass


class Administrator(User):
    def create_user(self):
        pass

    def edit_user(self):
        pass

    def delete_user(self):
        pass

    def assign_roles(self):
        pass

    def configure_academic_year(self):
        pass

    def generate_reports(self):
        pass


class FinanceOffice(Administrator):
    def manage_tuition_fee(self):
        pass

    def track_expenses(self):
        pass


class Parent(User):
    def view_grades(self):
        pass

    def view_attendance(self):
        pass

    def pay_fees(self):
        pass

    def view_payment_history(self):
        pass

    def receive_notifications(self):
        pass


class Teacher(User):
    def publish_resources(self):
        pass

    def enter_grades(self):
        pass

    def edit_grades(self):
        pass

    def create_assessments(self):
        pass

    def mark_attendance(self):
        pass

    def send_notifications(self):
        pass


class Student(User):
    def view_grades(self):
        pass

    def view_schedule(self):
        pass

    def download_resources(self):
        pass

    def submit_assignments(self):
        pass

    def view_attendance(self):
        pass

    def communicate_with_teachers(self):
        pass


# ----------------------------
# ACADEMIC STRUCTURE
# ----------------------------
class ClassRoom(models.Model):
    classId = models.AutoField(primary_key=True)
    className = models.CharField(max_length=100)
    students = models.ManyToManyField(Student, related_name="classrooms")
    teachers = models.ManyToManyField(Teacher, related_name="classrooms")

    def __str__(self):
        return self.className


class Subject(models.Model):
    subjectId = models.AutoField(primary_key=True)
    subjectName = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="subjects")

    def __str__(self):
        return self.subjectName


class Assignment(models.Model):
    assignmentId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="assignments")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="assignments")

    def __str__(self):
        return self.title


# ----------------------------
# PERFORMANCE & NOTIFICATIONS
# ----------------------------
class Grade(models.Model):
    gradeId = models.AutoField(primary_key=True)
    score = models.FloatField()
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="grades")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="grades")

    def add_comment(self, comment):
        pass


class Attendance(models.Model):
    attendanceId = models.AutoField(primary_key=True)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=[("Present", "Present"), ("Absent", "Absent")])
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="attendances")


class Notification(models.Model):
    notificationId = models.AutoField(primary_key=True)
    message = models.TextField()
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)

    def send(self):
        pass
