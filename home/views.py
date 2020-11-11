from django.shortcuts import render, HttpResponse
from django.conf import settings 
from django.core.mail import send_mail 
from home.models import *


def index(request):
    context = {
        'pcs': ProjectCategory.objects.all(),
        'projects': Project.objects.filter(active=True).order_by('?'),
        'services': Service.objects.all(),
        'tts': Testimony.objects.all(),
    }
    return render(request, 'home/index.html', context)

def response(request):
    if request.method == "POST":
        data = {
            "name": request.POST.get("name"),
            "email": request.POST.get("email"),
            "message": request.POST.get("message"),
        }
        r = Response(**data)
        r.save()

        email_body = f"{r.message} \n \n {r.email}"
        send_mail("Freelancing Query", email_body, settings.EMAIL_HOST_USER, ["ishantdahiya@gmail.com",])
    return HttpResponse(status=200)