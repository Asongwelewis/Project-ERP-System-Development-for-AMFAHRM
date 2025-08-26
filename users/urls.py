from django.urls import path
from .views import userprofile_list

urlpatterns = [
    path('profiles/', userprofile_list, name='userprofile_list'),
]
