import bcrypt

from django.test import TestCase, Client
from .models import User
from common.token import validate_token, create_token

# Create your tests here.
class UserTest(TestCase):
    
    def setUp(self):
        
        self.client = Client()
        
        self.email = "test@plantit.com"
        self.password1 = "test1234"
        self.password2 = "test1234"
        self.nickname = "plant-user"
        
        password = self.password1.encode("utf-8")
        pw_salt = bcrypt.gensalt()
        pw_hash = bcrypt.hashpw(password, pw_salt)
        decoded_pw_hash = pw_hash.decode()
        self.test_user = User.objects.create(email=self.email, password=decoded_pw_hash, nickname=self.nickname, user_type=0)
        self.access_token = create_token(email=self.email, user_type=0, user_id=self.test_user.id)
    
    def test_register_user(self):
        email = "test-register@plantit.com"
        password1 = "test1234"
        password2 = "test1234"
        nickname = "plant-user"
        
        request_data = { 
            "email": email,
            "password1": password1,
            "password2": password2,
            "nickname": nickname
            }
        res = self.client.post("/api/user/register", data=request_data, content_type="application/json")
        
        user = User.objects.last()
        checkpw = bcrypt.checkpw(password1.encode("utf-8"), user.password.encode("utf-8"))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(email, user.email)
        self.assertEqual(nickname, user.nickname)
        self.assertEqual(0, user.user_type)
        self.assertEqual(True, checkpw)
        
    def test_plantit_login(self):
        email = "test@plantit.com"
        password = "test1234"
        
        request_data = {
            "email": email,
            "password": password
        }
        res = self.client.post("/api/user/login", data=request_data, content_type="application/json")
        
        token = res.data["token"]
        token_validation = validate_token(token).status_code
        self.assertEqual(res.status_code, 200)
        self.assertEqual(token_validation, 200)
    
    def test_update_user_nickname_description(self):
        nickname = "updated-nickname"
        description = "updated-description"
        
        request_data = {
            "nickname": nickname,
            "description": description
        }
        header = {"HTTP_AUTHORIZATION": self.access_token}
        res = self.client.post("/api/user/update",
                                data=request_data,
                                content_type="application/json",
                                **header)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(self.test_user.nickname, nickname)
        self.assertEqual(self.test_user.description, description)