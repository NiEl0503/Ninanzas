"""Módulo que contiene las vistas"""
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category, Transaction, Budget
from .serializers import (UserLoginSerializer, UserRegistrationSerializer,
                          CategorySerializer, TransactionSerializer, BudgetSerializer)

class UserLoginAPIView(APIView):
    """Vista para el inicio de sesión de usuario."""

    def post(self, request):
        """Maneja las solicitudes POST para iniciar sesión de usuario."""
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, username=email, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token)
                    },
                    status=status.HTTP_200_OK
                )
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationAPIView(APIView):
    """Vista para el registro de usuario."""

    def post(self, request):
        """Maneja las solicitudes POST para registrar un nuevo usuario."""
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryAPIView(APIView):
    """Vista para las categorías."""
    permission_classes = [IsAuthenticated]

    def get(self, request): # pylint: disable=unused-argument
        """Maneja las solicitudes GET para obtener todas las categorías."""
        categories = Category.objects.all() # pylint: disable=no-member
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class TransactionAPIView(APIView):
    """Vista para las transacciones."""
    permission_classes = [IsAuthenticated]

    def get(self, request): # pylint: disable=unused-argument
        """Maneja las solicitudes GET para obtener todas las transacciones."""
        transactions = Transaction.objects.all() # pylint: disable=no-member
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

class BudgetAPIView(APIView):
    """Vista para los presupuestos."""
    permission_classes = [IsAuthenticated]

    def get(self, request): # pylint: disable=unused-argument
        """Maneja las solicitudes GET para obtener todos los presupuestos."""
        budgets = Budget.objects.all() # pylint: disable=no-member
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)

class DashboardAPIView(APIView):
    """Vista para el dashboard."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Maneja las solicitudes GET para obtener datos del dashboard."""
        user = request.user
        transactions = Transaction.objects.filter(user=user) # pylint: disable=no-member
        budgets = Budget.objects.filter(user=user) # pylint: disable=no-member

        transaction_serializer = TransactionSerializer(transactions, many=True)
        budget_serializer = BudgetSerializer(budgets, many=True)

        return Response({
            'transactions': transaction_serializer.data,
            'budgets': budget_serializer.data,
        })
    