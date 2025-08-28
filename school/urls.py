from django.urls import path
from .views import (
    get_student_courses,
    get_student_assignments,
    get_student_exams,
    get_student_grades,
    get_student_schedule,
)

urlpatterns = [
    path('student/<int:student_id>/courses/', get_student_courses),
    path('student/<int:student_id>/assignments/', get_student_assignments),
    path('student/<int:student_id>/exams/', get_student_exams),
    path('student/<int:student_id>/grades/', get_student_grades),
    path('student/<int:student_id>/schedule/', get_student_schedule),
]
