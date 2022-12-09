from django.shortcuts import render
from appointment.forms import MakeAppointmentForm
# Create your views here.

def index(request):
	form = MakeAppointmentForm()
	context={
	   'form': form
	}
	return render(request, 'index.html', context)

def about_us(request):
	return render(request,'about_us.html')

def service(request):
	return render(request,'service.html')