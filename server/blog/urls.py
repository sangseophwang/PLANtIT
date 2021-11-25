from django.urls import path
from . import views

urlpatterns = [
    path('post', views.post_blog, name='post_blog'),
    path('<int:blog_id>', views.get_blog, name='get_blog'),
    path('', views.blog_list, name='blog_list'),
    path('image', views.upload_image, name='upload_image'),
    path('update/<int:blog_id>', views.patch_blog, name='update_blog'),
    path('delete/<int:blog_id>', views.delete_blog, name='delete_blog'),
]