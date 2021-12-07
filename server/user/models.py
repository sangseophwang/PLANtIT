from django.db import models

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=256)
    nickname = models.CharField(max_length=50)
    user_type = models.IntegerField()
    refresh_token = models.CharField(max_length=512, null=True)
    description = models.CharField(max_length=256, null=f"안녕하세요 {nickname}입니다.")
    image = models.CharField(max_length=100, null=True, default='https://team3-plantit.s3.ap-northeast-2.amazonaws.com/profile/default.png') # image url
    
    def __str__(self):
        return self.email + "#" + str(self.user_type)
    
    class Meta:
        db_table = "user"