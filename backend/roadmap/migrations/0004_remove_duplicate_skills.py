from django.db import migrations

def remove_duplicate_skills(apps, schema_editor):
    Skill = apps.get_model('roadmap', 'Skill')
    RoadmapSkill = apps.get_model('roadmap', 'RoadmapSkill')
    Progress = apps.get_model('roadmap', 'Progress')
    
    # Get all skills
    skills = Skill.objects.all()
    # Create a dictionary to store unique skills
    unique_skills = {}
    
    # First pass: identify duplicates
    for skill in skills:
        if skill.name not in unique_skills:
            unique_skills[skill.name] = skill
        else:
            # If duplicate found, update references and delete
            duplicate = skill
            original = unique_skills[skill.name]
            
            # Update any references to the duplicate skill
            RoadmapSkill.objects.filter(skill=duplicate).update(skill=original)
            Progress.objects.filter(skill=duplicate).update(skill=original)
            
            # Delete the duplicate
            duplicate.delete()

class Migration(migrations.Migration):
    dependencies = [
        ('roadmap', '0003_rename_skills_roadmap_target_skills_and_more'),
    ]

    operations = [
        migrations.RunPython(remove_duplicate_skills),
    ] 