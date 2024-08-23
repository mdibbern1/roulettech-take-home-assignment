from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
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
            user = User(email=email, password=password, list_of_coins=list_of_coins)
            user.save()
            return HttpResponse("User created!")
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON", status=400)
    return HttpResponse("This is so cool!")

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return HttpResponse("Invalid email or password", status=400)
            
            try:
                user = User.objects.get(email=email)
                if user.password == password:
                    user_data = {
                        "email": user.email,
                        "list_of_coins": user.list_of_coins
                    }
                    return JsonResponse({"message": "login successful", "user": user_data})
                else:
                    return HttpResponse("Invalid email or password", status=400)
            except User.DoesNotExist:
                return HttpResponse("User does not exist", status=400)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON", status=400)