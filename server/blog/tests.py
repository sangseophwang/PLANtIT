import datetime
from django.test import TestCase, Client

from user.models import User
from blog.models import Blog
from blog.queryset import find_blog_by_id
from common.token import create_token
# Create your tests here.
class BlogTest(TestCase):
    
    def setUp(self):
        
        self.client = Client()
        
        self.email = "test@plantit.com"
        self.password = "test1234"
        self.nickname = "plant-user"

        self.test_user = User.objects.create(email=self.email, password=self.password, nickname=self.nickname, user_type=0)
        iat = datetime.datetime.utcnow()
        self.access_token = create_token(email=self.email, user_type=0, user_id=self.test_user.id, token_type='access', iat=iat)
        
    def test_커뮤니티_게시글_생성(self):
        title = "토마토 이렇게 드세요"
        content = "<h1>토마토 좋아하시나요?</h1><br><p>저도 참 좋아합니다. <img src='http://s3.aws.com/blog/tomato.png'><br></p><br><p>우리 다같이 토마토먹어요!!</p>"
        thumbnail = "http://s3.aws.com/blog/tomato.png"
        
        request_data = {
            "title" : title,
            "content" : content
        }
        header = {"HTTP_AUTHORIZATION": self.access_token}
        res = self.client.post("/api/blog/post", data=request_data, content_type="application/json", **header)
        
        blog = Blog.objects.last()
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(blog.title, title)
        self.assertEqual(blog.content, content)
        self.assertEqual(blog.thumbnail, thumbnail)
        self.assertEqual(blog.user, self.test_user)
        self.assertEqual(blog.view, 0)
        self.assertEqual(blog.upload_date, datetime.datetime.now().strftime('%Y-%m-%d'))
    
    def test_커뮤니티_게시글_수정(self):
        title = "토마토 이렇게 드세요"
        content = "<h1>토마토 좋아하시나요?</h1><br><p>저도 참 좋아합니다. <img src='http://s3.aws.com/blog/tomato.png'><br></p><br><p>우리 다같이 토마토먹어요!!</p>"
        thumbnail = "http://s3.aws.com/blog/tomato.png"
        view = 0
        upload_date = datetime.datetime.now().strftime('%Y-%m-%d')
        test_blog = Blog.objects.create(user=self.test_user, title=title, content=content, thumbnail=thumbnail, view=view, upload_date=upload_date)
        
        updated_title = "토마토 먹지마세요"
        updated_content = "<h1>토마토 왜 먹나요?</h1><br><p>이해가 안가요 <img src='http://s3.aws.com/blog/tomato.png'><br></p><br><p>먹지마요</p>"
        id = test_blog.id
        request_data = {
            "title" : updated_title,
            "content" : updated_content
        }
        header = {"HTTP_AUTHORIZATION": self.access_token}
        res = self.client.patch(f"/api/blog/update/{id}", data=request_data, content_type="application/json", **header)
        
        blog = find_blog_by_id(id)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(blog.title, updated_title)
        self.assertEqual(blog.content, updated_content)
        
    def test_커뮤니티_게시글_삭제(self):
        title = "토마토 이렇게 드세요"
        content = "<h1>토마토 좋아하시나요?</h1><br><p>저도 참 좋아합니다. <img src='http://s3.aws.com/blog/tomato.png'><br></p><br><p>우리 다같이 토마토먹어요!!</p>"
        thumbnail = "http://s3.aws.com/blog/tomato.png"
        view = 0
        upload_date = datetime.datetime.now().strftime('%Y-%m-%d')
        test_blog = Blog.objects.create(user=self.test_user, title=title, content=content, thumbnail=thumbnail, view=view, upload_date=upload_date)
        
        id = test_blog.id 
        header = {"HTTP_AUTHORIZATION": self.access_token}
        res = self.client.post(f"/api/blog/delete/{id}", **header)
        
        blog_counts = len(list(Blog.objects.all()))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(blog_counts, 0)