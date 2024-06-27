"""Modulo que maneja las rutas para que las vistas sean accesibles"""
from django.views.generic.base import RedirectView
from django.urls import path
from ninanzas_app.views import (UserLoginAPIView, UserRegistrationAPIView,
                                CategoryAPIView, TransactionAPIView, BudgetAPIView,
                                DashboardAPIView)

urlpatterns = [
    path('', RedirectView.as_view(url='/login/', permanent=True)),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('categories/', CategoryAPIView.as_view(), name='categories'),
    path('transactions/', TransactionAPIView.as_view(), name='transactions'),
    path('budgets/', BudgetAPIView.as_view(), name='budgets'),
    path('dashboard/', DashboardAPIView.as_view(), name='dashboard'),
]
