from django.db import models

# Create your models here.

class Contact(models.Model):
	first_name=models.CharField(max_length=50,blank=False,null=False)
	last_name=models.CharField(max_length=50,blank=False,null=False)
	email = models.EmailField(max_length=100,blank=False,null=False)
	phone_number=models.CharField(max_length=15,blank=False,null=False)
	subject = models.CharField(max_length=255,blank=False,null=False)
	message=models.TextField(blank=False,null=False)
	date_created=models.DateTimeField(null=False, blank=False, auto_now_add=True)
	date_updated=models.DateTimeField(null=False, blank=False, auto_now_add=True)
	def __str__(self):
		return "%s %s" % (self.first_name,self.last_name)
	class Meta:
		db_table = 'contact'
		verbose_name = 'Contact'
		verbose_name_plural = 'Contact'
		ordering = ['-date_created']