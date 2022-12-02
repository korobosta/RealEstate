from django.db import models

# Create your models here.
class Gallery(models.Model):
    image_path= models.ImageField(upload_to='gallery/photo/')
    is_slider=models.BooleanField(default=False)
    date_created=models.DateTimeField(null=False, blank=False, auto_now_add=True)
    date_updated=models.DateTimeField(null=False, blank=False, auto_now_add=True)
    def __str__(self):
        return "%s" % (self.image_path)
    class Meta:
        db_table = 'gallery'
        verbose_name = 'Gallery'
        verbose_name_plural = 'Gallery'
        ordering = ['-date_created']
  