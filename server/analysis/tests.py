from django.test import TestCase, Client
from django.urls import reverse
from analysis import views
from django.core.files.uploadedfile import SimpleUploadedFile
from io import StringIO
# Create your tests here.
class AnalysisTest(TestCase):
    
    def setUp(self):
        self.client = Client()
        

    def test_검사하기(self):
        url = reverse(views.analysis)
        
        imgfile = StringIO('GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00'
                            '\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;')
        imgfile.name = 'test_img_file.gif'

        res = self.client.post(url)       
        self.assertEqual(res.status_code, 200)
        