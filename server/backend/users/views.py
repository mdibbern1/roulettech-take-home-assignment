from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json

# Create your views here.
@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            list_of_coins = data.get("list_of_coins")
            print("email used: ", email)
            print("password used: ", password)
            print("list of coins used: ", list_of_coins)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON", status=400)
    return HttpResponse("This is so cool!")

def login(request):
    return HttpResponse("You have logged in!")