import json
import random

from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .queryset import find_blog_by_id, create_blog, update_blog, remove_blog, get_all_blog_by_date, get_all_blog_by_view
from user.queryset import find_user_by_id
from common.token import validate_token
from common.s3 import get_thumbnail_url, upload_blog_image
import requests
from django.http import HttpResponse

# Create your views here.

@api_view(['GET'])
def get_blog(request, blog_id):
    blog_detail = find_blog_by_id(blog_id)
   
    if not blog_detail:
        return Response(data="Not Found Blog")

    if request.headers['views'] == 'undefined' or request.headers['views'] != str(blog_id):
        blog_detail.view += 1
        blog_detail.save()

    is_author = False
    token_validation = None
    if 'HTTP_AUTHORIZATION' in request.META:
        access_token = request.META['HTTP_AUTHORIZATION']
        if access_token and len(access_token) > 10:
            token_validation = validate_token(access_token)
            if token_validation.status_code != 200:
                return token_validation
            if token_validation.data['payload']['user_id'] == blog_detail.user.id:
                is_author = True
    
    response_data = {
        'blog_id': blog_detail.id,
        'author': blog_detail.user.nickname,
        'author_image': blog_detail.user.image,
        'author_desc': blog_detail.user.description,
        'title': blog_detail.title,
        'content': blog_detail.content,
        'view': blog_detail.view,
        'upload_date': blog_detail.upload_date,
        'is_author': is_author,
        'new_token': token_validation.data['new_token'] if token_validation is not None and 'new_token' in token_validation.data else None
    }

    return Response(data=response_data, status=200)
    
@api_view(['POST'])
def post_blog(request):
    access_token = request.META['HTTP_AUTHORIZATION']
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation

    user_id = token_validation.data['payload']['user_id']
    user = find_user_by_id(user_id)
    request_body = json.loads(request.body)
    title = request_body['title']
    content = request_body['content']
    thumbnail = get_thumbnail_url(content)
    if not thumbnail:
        random_number = random.randint(1, 12)
        thumbnail = 'Assets/Thumbnail/' + str(random_number) + '.jpg'
            
    response_data = {
        'message': 'Post Success',
        'new_token': token_validation.data['new_token'] if 'new_token' in token_validation.data else None
    }
    
    if not create_blog(user=user, title=title, content=content, thumbnail=thumbnail):
        return Response(data='Post Fail', status=400)
    return Response(data=response_data, status=200)

@api_view(['PATCH'])
def patch_blog(request, blog_id):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation
    
    user_id = token_validation.data['payload']['user_id']
    blog_owner_id = find_blog_by_id(blog_id).user.id
    if user_id != blog_owner_id:
        return Response(data='Access Denied', status=400)
    
    request_body = json.loads(request.body)
    title = request_body['title']
    content = request_body['content']
    thumbnail = get_thumbnail_url(content)
    if not thumbnail:
        random_number = random.randint(1, 12)
        thumbnail = 'Assets/Thumbnail/' + str(random_number) + '.jpg'
    
    response_data = {
        'message': 'Update Success',
        'new_token': token_validation.data['new_token'] if 'new_token' in token_validation.data else None
    }
    
    if not update_blog(blog_id=blog_id, title=title, content=content, thumbnail=thumbnail):
        return Response(data='Update Fail', status=400)
    return Response(data=response_data, status=200)

@api_view(['POST'])
def delete_blog(request, blog_id):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation
    
    user_id = token_validation.data['payload']['user_id']
    blog_onwer_id = find_blog_by_id(blog_id).user.id
    if user_id != blog_onwer_id:
        return Response(data='Access Denied', status=400)
    
    response_data = {
        'message': 'Remove Success',
        'new_token': token_validation.data['new_token'] if 'new_token' in token_validation.data else None
    }
    
    if not remove_blog(blog_id=blog_id):
        return Response(data='Remove Fail', status=400)
    return Response(data=response_data, status=200)

@api_view(['POST'])
def upload_image(request):
    image = request.FILES['image']
    filename = image.name
    
    image_url = upload_blog_image(image, filename)
    return Response(data=image_url, status=200)

@api_view(['GET'])
def blog_list(request):
    if 'page' in request.GET:
        if not request.GET['page'].isdigit():
            return Response(data="Bad Request", status=400)
        page_number = int(request.GET['page'])
    else:
        page_number = 1
    
    if 'order' in request.GET:
        if not request.GET['order'].isdigit():
            return Response(data="Bad Request", status=400)
        order = int(request.GET['order'])
    else:
        order = 0
    
    if order == 0:
        blogs = get_all_blog_by_date()
    elif order == 1:
        blogs = get_all_blog_by_view()
    else:
        return Response(data="Bad Request", status=400)
    
    length = len(list(blogs))
    blogs_paginator = Paginator(blogs, 4)
    
    if page_number > blogs_paginator.num_pages:
        page_number = blogs_paginator.num_pages
        
    blogs_result = blogs_paginator.get_page(page_number)
    
    response_data = {
        'length': length,
        'blogs': [blog.as_dict() for blog in blogs_result]
    }
    
    return Response(data=response_data, status=200)

@api_view(['GET'])
def mainpage(request):
    blogs = get_all_blog_by_view()
    main_blogs = list(blogs)[:4]
    
    response_data = []
    for blog in main_blogs:
        data = {
            'blog_id': blog.id,
            'author': blog.user.nickname,
            'title': blog.title,
            'thumbnail': blog.thumbnail
        }
        response_data.append(data)
    return Response(data=response_data, status=200)
