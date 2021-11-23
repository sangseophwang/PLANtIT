from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Blog
from .queryset import find_blog_by_id, create_blog, update_blog_content, update_blog
from user.queryset import find_user_by_id
from common.token import validate_token
from common.s3 import upload_blog_image
import json
# Create your views here.

@api_view(['GET'])
def get_blog(request, blog_id):
    blog_detail = find_blog_by_id(blog_id)
    
    if not blog_detail:
        return Response(data="Not Found Blog")
    
    is_author = False
    access_token = request.META['HTTP_AUTHORIZATION']
    token_validation = validate_token(access_token)
    if token_validation.status_code == 200:
        if token_validation.data['user_id'] == blog_detail.user.id:
            is_author = True
    
    response_data = {
        'author': blog_detail.user.nickname,
        'title': blog_detail.title,
        'content': blog_detail.content,
        'view': blog_detail.view,
        'is_author': is_author
    }
    response_data = json.dumps(response_data)
    return Response(data=response_data, status=200)
    
@api_view(['POST'])
def post_blog(request):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation

    user_id = token_validation.data['user_id']
    user = find_user_by_id(user_id)
    request_body = json.loads(request.body)
    title = request_body['title']
    content = request_body['content']
    
    create_blog(user=user, title=title, content='-', thumbnail='-')
    
    return Response(data='Post Success', status=200)