from . models import Appointment
from django import forms
class MakeAppointmentForm(forms.ModelForm):
    class Meta:
        model=Appointment
        fields=('first_name','last_name','phone_number','email','date_time')
        widgets = {
          'first_name': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter First Name'}),
          'last_name': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Last Name'}),
          'phone_number': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Phone Number'}),
          'date_time': forms.NumberInput(attrs={'class': 'form-control','placeholder':'Enter Date/Time'}),
          'email': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Email'}),
        }