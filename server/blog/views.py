from django.shortcuts import get_object_or_404, render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Blog
import json
# Create your views here.

@api_view(['GET'])
def get_blog(request, blog_id):
    blog_detail = get_object_or_404(Blog, pk = blog_id)
    
    is_author = False
    
    response_data = {
        'author': 'a',
        'title': blog_detail.title,
        'content': blog_detail.content,
        'view': blog_detail.view,
        'is_author': is_author
    }