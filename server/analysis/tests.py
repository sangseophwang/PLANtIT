from django.test import TestCase, Client
from django.urls import reverse
from analysis import views
import tempfile

# Create your tests here.
class AnalysisTest(TestCase):
    
    def setUp(self):
        self.client = Client()
        

    def test_검사하기(self):
        url = reverse(views.analysis)

        # img = 'test.png'
        test_img = tempfile.NamedTemporaryFile(suffix=".png").name
        request_data = {
            "image" : test_img.replace('/','')
        }
        print(url, request_data)
        
        res = self.client.post(url, data=request_data, content_type="application/json")
        print(res.json())
        self.assertEqual(res.status_code, 200)
        