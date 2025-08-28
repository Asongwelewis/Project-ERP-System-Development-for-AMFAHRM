from django.urls import path
from .views import userprofile_list, login_view, signup_view

urlpatterns = [
    path('profiles/', userprofile_list, name='userprofile_list'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
]
