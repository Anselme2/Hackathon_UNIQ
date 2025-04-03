import requests
import json
import random
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.serialization import load_pem_public_key

# Charger la clé publique
with open("/home/anselme/Hackaton/keys/public_key.pem", "rb") as f:
    PUBLIC_KEY = load_pem_public_key(f.read())

API_URL = "http://127.0.0.1:8000/api/receive-data/"

def simulate_heart_sensor():
    """Simule un capteur de fréquence cardiaque"""
    bpm = random.randint(60, 100)
    spo2 = round(random.uniform(95, 100), 2)
    return {"bpm": bpm, "spo2": spo2}

def encrypt_data(data):
    """Chiffre les données avec RSA"""
    json_data = json.dumps(data).encode()

    encrypted_data = PUBLIC_KEY.encrypt(
        json_data,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    return encrypted_data.hex()  # Convertir en hexadécimal pour l'envoi

while True:
    data = simulate_heart_sensor()
    encrypted_data = encrypt_data(data)

    response = requests.post(API_URL, json={"data": encrypted_data}, headers={"Content-Type": "application/json"})

    print(f"📤 Données envoyées (chiffrées) : {encrypted_data}")
    print(f"✅ Réponse serveur : {response.text}")
