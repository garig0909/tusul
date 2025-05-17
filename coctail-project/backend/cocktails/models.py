from django.db import models

class Cocktail(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='cocktails/', null=True, blank=True)

    def __str__(self):
        return self.name
