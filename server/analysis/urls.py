from django.urls import path
from analysis import views

urlpatterns = [
    path('analysis', views.analysis),
]
