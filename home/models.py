from django.db import models

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
    
    def __str__(self):
        return self.name