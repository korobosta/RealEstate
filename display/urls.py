from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    #path('agent-commission/<int:agent_id>', views.agent_commission, name='agent_commission'), 
]
