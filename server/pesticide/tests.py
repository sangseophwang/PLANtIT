from django.test import TestCase
from .models import Pesticide
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from pesticide import views

# Create your tests here.

pesticide = list(Pesticide.objects.filter(name="발라 액제").values())

class PesticideApiTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        

    def test_pesticide_each(self):
        url = reverse(views.pesticide_each , kwargs={'name': "발라 액제"})

        res = self.client.get(url)
        test_data = {
                        "id": 3,
                        "name": "발라 액제",
                        "image": "a",
                        "description": "약효 증진시켜주는 기능성 전착제",
                        "component": "polyether modified polyslioxane 99%",
                        "packing_unit": "100ml",
                        "kind": "실록세인계",
                        "attribute": [
                        "이 농약은 다른 농약에 가용하여 살포하면 대상작물에 습전성 및 부착성을 좋게 하여 유효성분의 침투력을 증진시켜 줍니다."
                        ],
                        "information": [
                        "이 농약은 전착효과를 나타내는 약제이므로 약효를 나타내는 약제와 혼용하여 사용하십시오.",
                        "먼저 사용할 농약을 물에 희석한 후 반드시 물이 모두 채워진 상태에서 마지막으로 이 농약의 소정량을 희석액에 희석하여 사용하십시오.",
                        "이 농약을 다른 농약과 사용하면 기준량에서도 충분한 효과를 나타냅니다."
                        ]
                    }
 
        # get 요청 확인 
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # DB 조회 후 총 길이 확인
        self.assertEqual(test_data, pesticide[0])