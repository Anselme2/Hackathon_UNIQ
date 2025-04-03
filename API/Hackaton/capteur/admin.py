from django.contrib import admin
from . import models

class Donne_Liste(admin.ModelAdmin):
    list_display = ('id', 'bpm', 'spo2', 'date_heure') 
    list_filter = ('date_heure',)
    search_fields = ('bpm', 'spo2') 

admin.site.register(models.DonneeCapteur, Donne_Liste)
