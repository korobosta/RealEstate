from django.contrib import admin

from properties.models import Property

# Register your models here.
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("property_name","bedrooms","bathrooms","land_size","building_size","address","description","price","date_created")
    list_display_links = ['property_name']

    search_fields = [
        "property_name",
    ]