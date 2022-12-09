from django.urls import path
from . import views

urlpatterns = [
    path('make-appointment', views.make_appointment, name='make_appointment'), 
]
