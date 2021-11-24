import json
import bcrypt
import requests

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from common.token import validate_token, create_token
from common.s3 import upload_user_image
from .queryset import find_user_by_email_usertype, find_user_by_id, create_user, update_user

# Create your views here.

@api_view(['POST'])
def register(request):
    request_body = json.loads(request.body)
    email = request_body['email']
    password1 = request_body['password1']
    password2 = request_body['password2']
    nickname = request_body['nickname']
    
    if not password1 == password2:
        return Response(data='Password Not Same', status=400)

    if find_user_by_email_usertype(email, 0):
        return Response(data='Already Exist', status=400)

    password = password1.encode('utf-8')
    pw_salt = bcrypt.gensalt()
    pw_hash = bcrypt.hashpw(password, pw_salt)
    decoded_pw_hash = pw_hash.decode()
    
    new_user = create_user(email=email, password=decoded_pw_hash, nickname=nickname, user_type=0)
    if not new_user:
        return Response(data='Register Fail', status=200)
    
    return Response(data='Register Success', status=200)


@api_view(['POST'])
def login(request):
    request_body = json.loads(request.body)
    email = request_body['email']
    password = request_body['password']
    user_type = 0
    
    user = find_user_by_email_usertype(email, user_type)
    if not user:
        return Response(data='User Not Found', status=400)
    
    origin_pw = user.password
    pw_check = bcrypt.checkpw(password.encode('utf-8'), origin_pw.encode('utf-8'))
    if not pw_check:
        return Response(data='Wrong Password', status=400)
    
    user_id = user.id
    access_token = create_token(email=email, user_type=user_type, user_id=user_id)
    
    response_data = {
        'token': access_token,
        'message': 'login success'
    }
    return Response(data=response_data, status=200)


@api_view(['POST'])
def naver_login(request):
    request_body = json.loads(request.body)
    access_token = request_body['access_token']
    token_type = request_body['token_type']
    user_info = requests.get("https://openapi.naver.com/v1/nid/me", headers={'Authorization': f"{token_type} {access_token}"})
    
    user_info = user_info.json()
    nickname = user_info['response']['nickname']
    email = user_info['response']['email']
    user_type = 1
    
    user = find_user_by_email_usertype(email, user_type)
    if not user:
        user = create_user(email=email, password="naver-user", nickname=nickname, user_type=user_type)
        if not user:
            return Response(data='Register Fail', status=200)
        return Response(data='Register Success', status=200)
    
    user_id = user.id
    access_token = create_token(email=email, user_type=user_type, user_id=user_id)
    
    response_data = {
        'token': access_token,
        'message': 'naver login success'
    }
    return Response(data=response_data, status=200)
    
    
@api_view(['POST'])
def google_login(request):
    request_body = json.loads(request.body)
    id_token = request_body['id_token']
    user_info = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}")
    user_info = user_info.json()
    
    nickname = user_info['family_name'] + user_info['given_name']
    email = user_info['email']
    user_type = 2
    
    user = find_user_by_email_usertype(email, user_type)
    if not user:
        user = create_user(email=email, password="google-user", nickname=nickname, user_type=user_type)
        if not user:
            return Response(data='Register Fail', status=200)
        return Response(data='Register Success', status=200)
    
    user_id = user.id
    access_token = create_token(email=email, user_type=user_type, user_id=user_id)
    
    response_data = {
        'token': access_token,
        'message': 'google login success'
    }
    return Response(data=response_data, status=200)
    

@api_view(['POST'])
def deregister(request):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation
    
    user_id = token_validation.data['user_id']
    target_user = find_user_by_id(user_id)
    target_user.delete()
    
    return Response(data='Deregister Success', status=200)


@api_view(['POST'])
def update(request):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation
    
    request_body = json.loads(request.body)
    nickname = request_body['nickname']
    description = request_body['description']
    image = request_body['image']
    user_id = token_validation.data['user_id']
    uploaded_image = upload_user_image(image, user_id)
    
    update_result = update_user(user_id=user_id, nickname=nickname, description=description, image=uploaded_image)
    if not update_result:
        return Response(data='Update Fail', status=400)
    
    response_data = {
        'message' : "success",
        'nickname' : nickname,
        'description' : description,
        'image' : uploaded_image
    }
    return Response(data=response_data, status=200)

@api_view(['GET'])
def mypage(request):
    access_token = request.META['HTTP_AUTHORIZATION']
    
    token_validation = validate_token(access_token)
    if not token_validation.status_code == 200:
        return token_validation

    user_id = token_validation.data['user_id']
    target_user = find_user_by_id(user_id)
    
    response_data = {
        'message' : "success",
        'nickname' : target_user.nickname,
        'description' : target_user.description,
        'image' : target_user.image
    }
    return Response(data=response_data, status=200)