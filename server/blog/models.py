from django.db import models
from user.models import User
import datetime
# Create your models here.

class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    thumbnail = models.CharField(max_length=100) # image url
    view = models.IntegerField(default=0)
    upload_date = models.CharField(max_length=100, default=datetime.datetime.now().strftime('%Y-%m-%d'))
    
    def __str__(self):
        return self.title
    
    class Meta:
        db_table = "Blog"