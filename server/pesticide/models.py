from django.db import models

# Create your models here.

class Pesticide(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    component = models.CharField(max_length=50)
    packing_unit = models.CharField(max_length=50)
    kind = models.CharField(max_length=50)
    symptom = models.TextField()
    attribute = models.JSONField()
    information = models.JSONField()

    class Meta:
        db_table = 'pesticide'