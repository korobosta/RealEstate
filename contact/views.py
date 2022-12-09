from django.shortcuts import render,redirect
from contact.forms import ContactForm
from django.contrib import messages

def contact_us(request):
	form = ContactForm(request.POST or None)
	if request.method == 'POST':
		if form.is_valid():
			form.save()
			messages.success(request, 'We have recieved your message, we will get back to you.')
			return redirect('contact_us')
	return render(request, 'contact_us.html', {'form': form})