from django.db import models

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=256)
    nickname = models.CharField(max_length=50)
    user_type = models.IntegerField()
    description = models.CharField(max_length=256, null=True)
    image = models.CharField(max_length=100, null=True) # image url
    
    def __str__(self):
        return self.email + "#" + str(self.user_type)
    
    class Meta:
        db_table = "User"