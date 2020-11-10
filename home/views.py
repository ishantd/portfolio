from django.shortcuts import render
from home.models import *


def index(request):
    context = {
        'pcs': ProjectCategory.objects.all(),
        'projects': Project.objects.filter(active=True),
        'services': Service.objects.all(),
        'tts': Testimony.objects.all(),
    }
    return render(request, 'home/index.html', context)