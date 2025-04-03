import os
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.serialization import load_pem_private_key

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
            return JsonResponse({"message": "Données reçues avec succès", "data": capteur_data})
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Méthode non autorisée"}, status=405)
