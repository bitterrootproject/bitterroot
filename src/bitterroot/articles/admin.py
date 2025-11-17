from django.contrib import admin

from bitterroot.articles.models import (
    Article,
    Institution,
)


# Register your models here.
@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "website",
    ]


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "first_page",
        "published",
        "added",
        # "institution",
        # "abstract",
        "doi",
        "call_number",
    ]
