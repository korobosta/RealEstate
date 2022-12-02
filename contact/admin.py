from django.contrib import admin

from contact.models import Contact

# Register your models here.

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("first_name","last_name", "phone_number", "subject","message")
    list_display_links = ['first_name',"last_name"]

    search_fields = [
        "first_name","last_name", "phone_number", "subject",
    ]
