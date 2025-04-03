import os
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from .models import DonneeCapteur  # Importation de ton modèle

# Charger la clé privée depuis le dossier 'keys' dans la racine du projet
private_key_path = os.path.join(settings.BASE_DIR, 'keys', 'private_key.pem')

with open(private_key_path, "rb") as f:
    PRIVATE_KEY = load_pem_private_key(f.read(), password=None)

@csrf_exempt
def recevoir_donnees(request):
    """Déchiffre et affiche les données du capteur"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            encrypted_data = bytes.fromhex(data["data"])  # Convertir en bytes
            
            # Déchiffrement RSA
            decrypted_data = PRIVATE_KEY.decrypt(
                encrypted_data,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )

            capteur_data = json.loads(decrypted_data.decode())
            print("✅ Données reçues :", capteur_data)

            # Assurer que les données nécessaires sont présentes dans 'capteur_data'
            if 'bpm' in capteur_data and 'spo2' in capteur_data:
                # Créer une nouvelle instance du modèle et enregistrer dans la base de données
                donnee = DonneeCapteur.objects.create(
                    bpm=capteur_data['bpm'],
                    spo2=capteur_data['spo2']
                )
                donnee.save()

                return JsonResponse({"message": "Données reçues et enregistrées avec succès", "data": capteur_data})
            else:
                return JsonResponse({"error": "Les données du capteur sont incomplètes"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Méthode non autorisée"}, status=405)
