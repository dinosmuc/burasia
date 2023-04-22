from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging
from django.db.models import Sum
from django.views import View
from rest_framework import generics
from .models import Customer, Payment, Appointment
from .serializers import CustomerSerializer, PaymentSerializer,AppointmentSerializer

class CustomerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class PaymentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class PaymentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class AppointmentList(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


logger = logging.getLogger(__name__)

@csrf_exempt
def total_money_received(request):
    try:
        total_money = Customer.objects.aggregate(total_received=Sum('payments__amount'))['total_received']
        if total_money is None:
            total_money = 0
        return JsonResponse({'total_money_received': float(total_money)})
    except Exception as e:
        logger.error(f"Error fetching total money received: {e}")
        return JsonResponse({'error': str(e)}, status=500)
