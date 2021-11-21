from django.core.exceptions import ObjectDoesNotExist
from .models import User

def find_user_by_id(user_id):
    try:
        user = User.objects.get(pk=user_id)
    except ObjectDoesNotExist:
        return False
    else:
        return user

def find_user_by_email_usertype(email, user_type):
    try:
        user = User.objects.get(email=email, user_type=user_type)
    except ObjectDoesNotExist:
        return False
    else:
        return user
    
def create_user(email, password, nickname, user_type):
    new_user = User(email=email, password=password, nickname=nickname, user_type=user_type)
    try:
        new_user.save()
    except:
        return False
    else:
        return new_user

def update_user(user_id, nickname, description, image):
    target_user = find_user_by_id(user_id)
    try:
        target_user.nickname = nickname
        target_user.description = description
        target_user.image = image
        target_user.save()
    except:
        return False
    else:
        return True