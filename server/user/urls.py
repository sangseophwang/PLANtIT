from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='user-login'),
    path('naver_login/', views.naver_login, name='user-naver-login'),
    path('google_login/', views.google_login, name='user-google-login'),
    path('register/', views.register, name='user-register'),
    path('deregister/', views.deregister, name='user-deregister'),
    path('update/', views.update, name='user-update'),
    path('mypage/', views.mypage, name='user-mypage'),
]