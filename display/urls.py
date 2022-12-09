from django.contrib import admin
from django.urls import path
from . import views
from appointment.forms import MakeAppointmentForm

urlpatterns = [
    path('', views.index, name='index'),
    path('about-us', views.about_us, name='about_us'),
    path('service', views.service, name='service'),
]
