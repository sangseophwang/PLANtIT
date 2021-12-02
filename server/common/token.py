import jwt
import datetime

from django.conf import settings
from rest_framework.response import Response
from user.queryset import find_user_by_id, update_user_refresh_token

def create_token(email, user_type, user_id, token_type, iat):
    if token_type == 'access':
        expire_period = iat + datetime.timedelta(seconds=30)
        payload = {'exp': expire_period, 'email': email, 'user_type': user_type, 'user_id': user_id, 'iat': iat}
    elif token_type == 'refresh':
        expire_period = iat + datetime.timedelta(seconds=60)
        payload = {'exp': expire_period, 'user_id': user_id, 'iat': iat}
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
        issued_at = payload['iat']
        
        user = find_user_by_id(user_id)
        user_refresh_token = user.refresh_token
        
        try:
            refresh_payload = jwt.decode(user_refresh_token, jwt_key, jwt_algorithm)
        except jwt.ExpiredSignatureError:
            return Response(data='Expired Token', status=401)
        except jwt.InvalidTokenError:
            return Response(data='Invalid Token', status=401)
        else:
            if issued_at != refresh_payload['iat']:
                return Response(data='Security Warning', status=400)
            
            iat = datetime.datetime.utcnow()
            new_token = create_token(email=email, user_type=user_type, user_id=user_id, token_type='access', iat=iat)
            new_refresh_paylaod = {
                'exp': refresh_payload['exp'],
                'user_id': refresh_payload['user_id'],
                'iat': iat 
            }
            new_refresh_token = jwt.encode(new_refresh_paylaod, settings.JWT_SECRET_KEY, settings.JWT_ALGORITHM)
            user.refresh_token = new_refresh_token
            user.save()
            
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
