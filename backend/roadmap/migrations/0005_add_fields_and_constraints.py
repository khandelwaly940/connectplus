from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('roadmap', '0004_remove_duplicate_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AddField(
            model_name='roadmapskill',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='roadmapskill',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='roadmap',
            name='current_level',
            field=models.CharField(choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')], max_length=20),
        ),
        migrations.RemoveField(
            model_name='roadmap',
            name='preferred_resources',
        ),
        migrations.AlterField(
            model_name='roadmap',
            name='target_level',
            field=models.CharField(choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')], max_length=20),
        ),
        migrations.AlterField(
            model_name='roadmap',
            name='timeline',
            field=models.IntegerField(default=4, help_text='Timeline in weeks'),
        ),
        migrations.AddField(
            model_name='roadmap',
            name='preferred_resources',
            field=models.ManyToManyField(blank=True, to='roadmap.resource'),
        ),
        migrations.AlterUniqueTogether(
            name='progress',
            unique_together={('roadmap', 'skill')},
        ),
        migrations.AlterUniqueTogether(
            name='roadmapskill',
            unique_together={('roadmap', 'skill')},
        ),
    ] 