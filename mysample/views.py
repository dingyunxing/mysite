from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'mysample/index.html')
    #return HttpResponse("Hello, world. You're at the polls index.")

