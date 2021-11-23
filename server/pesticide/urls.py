from django.urls import path
from pesticide import views

urlpatterns = [
    path('pesticide/<str:name>', views.pesticide_each)
]
