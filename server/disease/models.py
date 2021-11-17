from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.

class Crop(models.Model):

    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'crop'

class Disease(models.Model):
    
    crops = models.ForeignKey(Crop, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    english_name = models.CharField(max_length=50)
    image = models.CharField(max_length=100)
    symptom = models.TextField()
    cause = models.TextField()
    prevention = models.JSONField()
    pesticides = models.JSONField()

    class Meta:
        db_table = 'disease'



