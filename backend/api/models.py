from django.db import models
from django.utils import timezone
from django.db.models import Sum


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    work = models.CharField(max_length=100,default='Garden work')
    image = models.ImageField(upload_to='customer_images/', null=True, blank=True)

    def total_paid(self):
        return sum(payment.amount for payment in self.payments.all())

    def __str__(self):
        return self.name
    

class Payment(models.Model):
    customer = models.ForeignKey(Customer, related_name='payments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f'{self.customer.name} - {self.amount}'
    

class Appointment(models.Model):
    customer = models.ForeignKey(Customer, related_name='appointments', on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()

    def __str__(self):
        return f'{self.customer.name} - {self.appointment_date}'
    