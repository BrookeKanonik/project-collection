# Generated by Django 4.1.5 on 2023-04-13 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_countinstoc_product_countinstock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholderforstore.png', null=True, upload_to=''),
        ),
    ]
