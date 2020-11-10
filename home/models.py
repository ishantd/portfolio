from django.db import models
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO

# Create your models here.
class ProjectCategory(models.Model):
    name = models.CharField(max_length=255, null=True, blank=False)
    abbr = models.CharField(max_length=255, null=True, blank=False)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=255, null=True, blank=False)
    description = models.TextField(null=True, blank=False)
    visit_url = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to ='projects/') 
    category = models.ForeignKey(ProjectCategory,on_delete=models.CASCADE, null=True, blank=False)
    
    def save(self, *args, **kwargs):
        if self.image:
            filename = "%s.webp" % self.image.name.split('.')[0]
            image = Image.open(self.image)
            # for PNG images discarding the alpha channel and fill it with some color
            if image.mode in ('RGBA', 'LA'):
                background = Image.new(image.mode[:-1], image.size, '#fff')
                background.paste(image, image.split()[-1])
                image = background
            image_io = BytesIO()
            image.save(image_io, format='WEBP', quality=95)

            # change the image field value to be the newly modified image value
            self.image.save(filename, ContentFile(image_io.getvalue()), save=False)

        super(Project, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name

class Response(models.Model):
    name = models.CharField(max_length=255, null=True, blank=False)
    email = models.CharField(max_length=255, null=True, blank=False)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

class Service(models.Model):
    name = models.CharField(max_length=255, null=True, blank=False)
    icon = models.CharField(max_length=255, null=True, blank=False)
    body = models.TextField(null=True, blank=True)

class Testimony(models.Model):
    name = models.CharField(max_length=255, null=True, blank=False)
    position = models.CharField(max_length=255, null=True, blank=False)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    body = models.TextField(null=True, blank=True)