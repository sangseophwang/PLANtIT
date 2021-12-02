import jwt
import datetime

from django.conf import settings
from rest_framework.response import Response
from user.queryset import find_user_by_id, update_user_refresh_token

def create_token(email, user_type, user_id, token_type):
    if token_type == 'access':
        expire_period = datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
        payload = {'exp': expire_period, 'email': email, 'user_type': user_type, 'user_id': user_id}
    elif token_type == 'refresh':
        expire_period = datetime.datetime.utcnow() + datetime.timedelta(seconds=60)
        payload = {'exp': expire_period, 'user_id': user_id}
    else:
        return False
    
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    token = jwt.encode(payload, jwt_key, jwt_algorithm)
    if token_type == 'refresh':
        update_user_refresh_token(user_id=user_id, refresh_token=token)
    return token

def re_create_token(token):
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    try:
        payload = jwt.decode(token, key=jwt_key, algorithms=[jwt_algorithm], options={'verify_exp' : False})
    except jwt.InvalidTokenError:
        return Response(data='Invalid Token', status=401)
    else:
        email = payload['email']
        user_type = payload['user_type']
        user_id = payload['user_id']
        
        user = find_user_by_id(user_id)
        user_refresh_token = user.refresh_token
        
        try:
            payload = jwt.decode(user_refresh_token, jwt_key, jwt_algorithm)
        except jwt.ExpiredSignatureError:
            return Response(data='Expired Token', status=401)
        except jwt.InvalidTokenError:
            return Response(data='Invalid Token', status=401)
        else:
            new_token = create_token(email=email, user_type=user_type, user_id=user_id, token_type='access')
            response_data = {
                'new_token' : new_token,
                'payload' : payload
            }
            return Response(data=response_data, status=200)
        
def validate_token(token):
    jwt_key = settings.JWT_SECRET_KEY
    jwt_algorithm = settings.JWT_ALGORITHM
    try:
        payload = jwt.decode(token, jwt_key, jwt_algorithm)
    except jwt.ExpiredSignatureError:
        response = re_create_token(token)
        return response
    except jwt.InvalidTokenError:
        return Response(data='Invalid Token', status=401)
    else:
        response_data = {
            'payload' : payload
        }
        return Response(data=response_data, status=200)
