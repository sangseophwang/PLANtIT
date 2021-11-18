from django.shortcuts import get_object_or_404, render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Blog
from user.views import validate_token
import json
# Create your views here.

@api_view(['GET', 'PATCH', 'DELETE'])
def blog(request, blog_id):
    blog_detail = get_object_or_404(Blog, pk = blog_id)
    
    is_author = False
    
    response_data = {
        'author': 'a',
        'title': blog_detail.title,
        'content': blog_detail.content,
        'view': blog_detail.view,
        'is_author': is_author
    }
    
@api_view(['POST'])
def post_blog(request):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation == True:
        return token_validation
    
    return Response(data='Post Success', status=200)