from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import (
    CustomerListCreateAPIView,
    CustomerRetrieveUpdateDestroyAPIView,
    PaymentListCreateAPIView,
    PaymentRetrieveUpdateDestroyAPIView,
    AppointmentDetail,
    AppointmentList,
    total_money_received,
)

urlpatterns = [
    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list-create'),
    path('customers/<int:pk>/', CustomerRetrieveUpdateDestroyAPIView.as_view(), name='customer-retrieve-update-destroy'),
    path('payments/', PaymentListCreateAPIView.as_view(), name='payment-list-create'),
    path('payments/<int:pk>/', PaymentRetrieveUpdateDestroyAPIView.as_view(), name='payment-retrieve-update-destroy'),
    path('appointments/', AppointmentList.as_view(), name='appointment-list'),
    path('appointments/<int:pk>/', AppointmentDetail.as_view(), name='appointment-detail'),
     path('customers/total_money_received/', total_money_received, name='total_money_received'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)