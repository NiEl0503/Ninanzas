"""Módulo que contiene los serializers de Django REST Framework para serializar datos"""

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction, Budget

class UserLoginSerializer(serializers.ModelSerializer):
    """Serializer para el login de usuario."""
    class Meta:
        """Define el modelo base y los campos a serializar."""
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer para el registro de usuario"""
    class Meta:
        """Define el modelo base y los campos a serializar."""
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CategorySerializer(serializers.ModelSerializer):
    """Serializer para el modelo Category."""
    class Meta:
        """Define el modelo base, los campos a serializar."""
        model = Category
        fields = ['id', 'name']

class TransactionSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Transaction"""
    class Meta:
        """Define el modelo base, los campos a serializar."""
        model = Transaction
        fields = ['id', 'user', 'category', 'amount', 'transaction_type', 'description', 'date']

class BudgetSerializer(serializers.ModelSerializer):
    """Serializer para el modelo Budget."""
    class Meta:
        """Define el modelo base, los campos a serializar."""
        model = Budget
        fields = ['id', 'user', 'category', 'amount', 'month']
