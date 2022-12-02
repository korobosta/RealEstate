from django.contrib import admin

from gallery.models import Gallery

# Register your models here.
@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ("image_path","is_slider")
    list_display_links = ['image_path']

    search_fields = [
        "image_path",
    ]