from django.db import models

# Create your models here.
class Appointment(models.Model):
    first_name=models.CharField(max_length=50,blank=False,null=False)
    last_name=models.CharField(max_length=50,blank=False,null=False)
    email = models.EmailField(max_length=100,blank=False,null=False)
    phone_number=models.CharField(max_length=15,blank=False,null=False)
    date_time=models.DateTimeField(blank=False,null=False)
    date_created=models.DateTimeField(null=False, blank=False, auto_now_add=True)
    date_updated=models.DateTimeField(null=False, blank=False, auto_now_add=True)
    def __str__(self):
        return "%s %s" % (self.first_name,self.last_name)
    class Meta:
        db_table = 'appointments'
        verbose_name = 'Appointment'
        verbose_name_plural = 'Appointments'
        ordering = ['-date_created']