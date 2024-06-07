"""Módulo que contiene clases para definir modelos de datos en Django."""
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    """Modelo para representar categorías para clasificar transacciones."""
    name = models.CharField(max_length=100)

 # pylint: disable=invalid-str-returned
    def __str__(self):
        return self.name

class Transaction(models.Model):
    """Modelo para representar transacciones financieras."""
    TRANSACTION_TYPES = (
        ('income', 'Income'),
        ('expense', 'Expense'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(choices=TRANSACTION_TYPES, max_length=7)
    description = models.TextField()
    date = models.DateField()

class Budget(models.Model):
    """Modelo para representar presupuestos."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()
