from django.contrib import admin

from appointment.models import Appointment

# Register your models here.
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("first_name","last_name", "phone_number", "date_time","email")
    list_display_links = ['first_name',"last_name"]

    search_fields = [
        "first_name","last_name", "phone_number", "email",
    ]