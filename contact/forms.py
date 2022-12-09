from contact.models import Contact
from django import forms
class ContactForm(forms.ModelForm):
    class Meta:
        model=Contact
        fields=('first_name','last_name','phone_number','email','subject','message')
        widgets = {
          'first_name': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter First Name'}),
          'last_name': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Last Name'}),
          'phone_number': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Phone Number'}),
          'subject': forms.NumberInput(attrs={'class': 'form-control','placeholder':'Enter Date/Time'}),
          'email': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Email'}),
          'message': forms.TextInput(attrs={'class': 'form-control','placeholder':'Enter Message'}),
        }