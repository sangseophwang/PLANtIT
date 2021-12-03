from django.test import TestCase, Client
from django.urls import reverse
from analysis import views
from django.core.files.uploadedfile import SimpleUploadedFile
import io
from PIL import Image
# Create your tests here.
class AnalysisTest(TestCase):
    
    def setUp(self):
        self.client = Client()

    def temporary_image(self):
        bts = io.BytesIO()
        img = Image.new("RGB", (100, 100))
        img.save(bts, 'jpeg')
        return SimpleUploadedFile("test.jpg", bts.getvalue())


    def test_검사하기(self):
        url = reverse(views.analysis)

        img = io.BytesIO(
            b'GIF87a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00ccc,\x00'
            b'\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;')
        image_name = 'foo_image.gif'
        file = SimpleUploadedFile(
            image_name, img.read(), content_type='image/gif')
        data = {'files': file}
        res = self.client.post(url, data, format='multipart')  
        print(res.json(), data)     
