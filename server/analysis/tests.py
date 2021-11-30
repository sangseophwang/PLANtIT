from os import read
from django.test import TestCase, Client
from django.urls import reverse
from analysis import views
import tempfile
from django.core.files.uploadedfile import SimpleUploadedFile

# Create your tests here.
class AnalysisTest(TestCase):
    
    def setUp(self):
        self.client = Client()
        

    def test_검사하기(self):
        url = reverse(views.analysis)
        small_gif = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b'
        )
        tes = SimpleUploadedFile('test_img', content=small_gif,content_type="image/jpg")
        request_data = {
            "image" : tes
        }
        print(url, request_data)
        
        res = self.client.post(url, data=request_data, content_type="image/jpeg")
        print(res.json())
        self.assertEqual(res.status_code, 200)
        