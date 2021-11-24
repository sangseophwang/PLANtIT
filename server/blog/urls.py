from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_blog, name='post_blog'),
    path('<int:blog_id>', views.get_blog, name='get_blog'),
    path('image/', views.upload_image, name='upload_image'),
]