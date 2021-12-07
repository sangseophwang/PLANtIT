import bcrypt
import datetime

from django.test import TestCase, Client
from .models import User
from common.token import validate_token, create_token
from .queryset import find_user_by_id

# Create your tests here.
class UserTest(TestCase):
    
    def setUp(self):
        
        self.client = Client()
        
        self.email = "test@plantit.com"
        self.password = "test1234"
        self.nickname = "plant-user"
        
        password = self.password.encode("utf-8")
        pw_salt = bcrypt.gensalt()
        pw_hash = bcrypt.hashpw(password, pw_salt)
        decoded_pw_hash = pw_hash.decode()
        self.test_user = User.objects.create(email=self.email, password=decoded_pw_hash, nickname=self.nickname, user_type=0)
        iat = datetime.datetime.utcnow()
        self.access_token = create_token(email=self.email, user_type=0, user_id=self.test_user.id, token_type='access', iat=iat)
    
    def test_회원가입하기(self):
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
        
    def test_플래닛_로그인하기(self):
        email = "test@plantit.com"
        password = "test1234"
        
        request_data = {
            "email": email,
            "password": password
        }
        res = self.client.post("/api/user/login", data=request_data, content_type="application/json")
        
        token = res.data["token"]
        token_validation = validate_token(token)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(token_validation.status_code, 200)
    
    def test_닉네임_한줄소개_수정하기(self):
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
        
        user = find_user_by_id(self.test_user.id)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(user.nickname, nickname)
        self.assertEqual(user.description, description)
        
    def test_회원탈퇴하기(self):
        header = {"HTTP_AUTHORIZATION": self.access_token}
        res = self.client.post("/api/user/deregister",
                                content_type="application/json",
                                **header)
        
        user_counts = len(list(User.objects.all()))
    
        self.assertEqual(res.status_code, 200)
        self.assertEqual(user_counts, 0)
        
    def test_마이페이지_불러오기(self):
        header = {"HTTP_AUTHORIZATION": self.access_token}
        res = self.client.get("/api/user/mypage",
                                content_type="application/json",
                                **header)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['nickname'], 'plant-user')