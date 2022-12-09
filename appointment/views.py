from django.shortcuts import render,redirect
from appointment.forms import MakeAppointmentForm
from django.contrib import messages
# Create your views here.

def make_appointment(request):
	form = MakeAppointmentForm(request.POST)
	if request.method == 'POST':
		if form.is_valid():
			form.save()
			messages.success(request, 'Appointment made successfully')
			return redirect('index')
		return render(request, 'index.html', {'form': form})