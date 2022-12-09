from django.db import models

# Create your models here.
class Property(models.Model):
    property_name=models.CharField(max_length=255,blank=False,null=False)
    bedrooms=models.IntegerField(blank=True,null=True)
    bathrooms=models.IntegerField(blank=True,null=True)
    land_size=models.CharField(max_length=50,blank=True,null=True)
    building_size=models.CharField(max_length=50,blank=True,null=True)
    address=models.CharField(max_length=100,blank=False,null=False)
    description=models.TextField(blank=True,null=True)
    price = models.DecimalField(blank=False, max_digits=10, decimal_places=2)
    date_created=models.DateTimeField(null=False, blank=False, auto_now_add=True)
    date_updated=models.DateTimeField(null=False, blank=False, auto_now_add=True)
    PROPERTY_CATEGORIES=[
        ('House', 'House'),
        ('Land', 'Land'),
        ('Apartment', 'Apartment'),
        ('Commercial Property','Commercial Property')
    ]
    property_category= models.CharField(
        max_length=50,
        choices=PROPERTY_CATEGORIES)
    PROPERTY_TYPES=[
        ('1', 'for Rent'),
        ('2', 'for Sale'),
    ]
    property_category= models.CharField(
        max_length=10,
        choices=PROPERTY_TYPES)
    image_path= models.ImageField(upload_to='properties/')
    def __str__(self):
        return "%s" % (self.property_name)
    class Meta:
        db_table = 'properties'
        verbose_name = 'Property'
        verbose_name_plural = 'Properties'
        ordering = ['-date_created']
      