from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns  
from disease import views

urlpatterns = [
    path('disease', views.disease_all),
    path('disease/<int:id>',views.disease_each)
    # url(r'^(?P<pk>[0-9]+)/$', views.bbs_detail),
]

# urlpatterns = format_suffix_patterns(urlpatterns)