from django.contrib import admin

from bitterroot.articles.models import (
    Article,
    Aspect,
    AuthorPublisherInfo,
    CallNumber,
    Domain,
    Institution,
    Root,
    Subject,
    Topic,
)


# Register your models here.
@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
    ]


@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
        "subject",
    ]


@admin.register(Root)
class RootAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
        "domain",
    ]


@admin.register(Aspect)
class AspectAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
        "root",
    ]


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
        "aspect",
    ]


@admin.register(AuthorPublisherInfo)
class AuthorPublisherInfoAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
    ]


@admin.register(CallNumber)
class CallNumberAdmin(admin.ModelAdmin):
    list_display = [
        "subject",
        "domain",
        "root",
        "aspect",
        "topic",
        "author_pub",
    ]


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
