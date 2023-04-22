from rest_framework import serializers
from .models import Customer, Payment, Appointment

class CustomerSerializer(serializers.ModelSerializer):
    total_paid = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = ['id', 'name', 'address', 'work', 'image', 'total_paid', 'image_url']
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'customer', 'amount', 'date')

class AppointmentSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.name')

    class Meta:
        model = Appointment
        fields = ['id', 'customer', 'customer_name', 'appointment_date']