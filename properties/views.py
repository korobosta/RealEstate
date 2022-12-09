from django.shortcuts import render
from properties.models import Property

# Create your views here.
def properties(request):
	properties=Property.objects.all()
	context={'properties':properties}
	return render(request,'properties.html',context)