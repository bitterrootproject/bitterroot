from django.contrib import admin

from bitterroot.call_numbers.models import (
    Aspect,
    AuthorPublisher,
    CallNumber,
    Domain,
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
        # "root",
    ]


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "number",
        "aspect",
    ]


@admin.register(AuthorPublisher)
class AuthorPublisherAdmin(admin.ModelAdmin):
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
