from django.urls import path
from analysis import views

urlpatterns = [
    path('analysis', views.analysis),
    path('analysis/count', views.total_analysis_count),
]
