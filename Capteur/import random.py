import requests
import json
import random
import os
from base64 import b64encode
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding as sym_padding

API_URL = "http://127.0.0.1:8000/api/receive-data/"

# Clé AES partagée (16, 24 ou 32 octets pour AES-128, 192, 256)
AES_KEY = b'TaCleSecrete1234'  # 16 octets => AES-128

def simulate_heart_sensor():
    """Simule un capteur de fréquence cardiaque"""
    bpm = random.randint(60, 100)
    spo2 = round(random.uniform(95, 100), 2)
    return {"bpm": bpm, "spo2": spo2}

def encrypt_data_aes(data, key):
    """Chiffre les données avec AES (CBC)"""
    json_data = json.dumps(data).encode()

    # Padding PKCS7
    padder = sym_padding.PKCS7(128).padder()
    padded_data = padder.update(json_data) + padder.finalize()

    # IV aléatoire (16 octets pour AES)
    iv = os.urandom(16)

    # Chiffrement AES
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()

    # Retourner IV + données chiffrées encodées en base64
    return b64encode(iv + ciphertext).decode()

while True:
    data = simulate_heart_sensor()
    encrypted_data = encrypt_data_aes(data, AES_KEY)

    response = requests.post(
        API_URL,
        json={"data": encrypted_data},
        headers={"Content-Type": "application/json"}
    )

    print(f"📤 Données envoyées (AES) : {encrypted_data}")
    print(f"✅ Réponse serveur : {response.text}")

