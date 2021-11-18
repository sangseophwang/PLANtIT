from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_blog, name='post_blog'),
]