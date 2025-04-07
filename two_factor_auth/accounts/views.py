from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from random import choices
from .models import OTP
from .serializers import UserSerializer, LoginSerializer
from datetime import timedelta
from django.utils import timezone

# Vue pour l'inscription de l'utilisateur
class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()  # Utilisation de get_user_model pour l'utilisateur
    serializer_class = UserSerializer


# Vue pour la connexion de l'utilisateur par email et mot de passe, envoi de l'OTP
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Vérification des identifiants de l'utilisateur
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

        # Authentification de l'utilisateur avec le mot de passe
        if not user.check_password(password):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Génération d'un code OTP à 6 chiffres
        otp_code = ''.join(choices('0123456789', k=6))

        # Créer un OTP et le sauvegarder
        otp = OTP.objects.create(user=user, otp_code=otp_code)

        # Envoi de l'OTP par email
        send_mail(
            'Votre code OTP',
            f'Votre code OTP est {otp_code}. Il expire dans 5 minutes.',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response({'message': 'OTP envoyé'}, status=status.HTTP_200_OK)


# Vue pour la vérification du OTP
class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp_code = request.data.get("otp_code")
        
        try:
            # Récupération de l'utilisateur par email
            user = get_user_model().objects.get(email=email)
            otp = OTP.objects.get(user=user, otp_code=otp_code)

            # Vérification de l'expiration de l'OTP (5 minutes)
            if otp.is_expired():
                return Response({"error": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

            # Marquer l'OTP comme validé ou le supprimer
            otp.delete()  # Ou marquer comme utilisé selon ta logique

            return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)

        except OTP.DoesNotExist:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        except get_user_model().DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
