from django.db import models

# Create your models here.

class DonneeCapteur(models.Model):
    bpm = models.IntegerField()
    spo2 = models.FloatField()
    date_heure = models.DateTimeField(auto_now_add=True)  # Enregistrer la date et l'heure de la réception des données

    def __str__(self):
        return f"DonneeCapteur - BPM: {self.bpm}, SPO2: {self.spo2} - {self.date_heure}"
