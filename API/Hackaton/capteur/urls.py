from django.urls import path
from .views import recevoir_donnees

urlpatterns = [
    path("receive-data/", recevoir_donnees, name="receive-data"),
]
