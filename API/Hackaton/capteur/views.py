import os
import base64
import json
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding as sym_padding
from .models import DonneeCapteur  # Ton modèle

# Clé AES partagée avec le client (16, 24 ou 32 octets)
AES_KEY = b'TaCleSecrete1234'  # doit correspondre exactement à la clé utilisée côté client

@csrf_exempt
def recevoir_donnees(request):
    """Déchiffre les données AES envoyées par le capteur et les enregistre."""
    if request.method == "POST":
        try:
            # Récupérer les données chiffrées envoyées par le client
            body = json.loads(request.body)
            encrypted_b64 = body.get("data")

            if not encrypted_b64:
                return JsonResponse({"error": "Données manquantes"}, status=400)

            encrypted_data = base64.b64decode(encrypted_b64)

            # Séparer IV et ciphertext
            iv = encrypted_data[:16]
            ciphertext = encrypted_data[16:]

            # Déchiffrement AES CBC
            cipher = Cipher(algorithms.AES(AES_KEY), modes.CBC(iv))
            decryptor = cipher.decryptor()
            padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()

            # Suppression du padding
            unpadder = sym_padding.PKCS7(128).unpadder()
            plaintext = unpadder.update(padded_plaintext) + unpadder.finalize()

            capteur_data = json.loads(plaintext.decode())
            print("✅ Données reçues :", capteur_data)

            # Enregistrement si données valides
            if 'bpm' in capteur_data and 'spo2' in capteur_data:
                DonneeCapteur.objects.create(
                    bpm=capteur_data['bpm'],
                    spo2=capteur_data['spo2']
                )
                return JsonResponse({"message": "Données enregistrées", "data": capteur_data})
            else:
                return JsonResponse({"error": "Données incomplètes"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Méthode non autorisée"}, status=405)

