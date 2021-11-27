from django.test import TestCase, Client

from user.models import User
from common.token import create_token
# Create your tests here.
class BlogTest(TestCase):
    
    def setUp(self):
        
        self.client = Client()
        
        self.email = "test@plantit.com"
        self.password = "test1234"
        self.nickname = "plant-user"

        self.test_user = User.objects.create(email=self.email, password=self.password, nickname=self.nickname, user_type=0)
        self.access_token = create_token(email=self.email, user_type=0, user_id=self.test_user.id)