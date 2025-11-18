from __future__ import annotations

from django.db import models

from bitterroot.call_numbers.models import (
    # Subject,
    # Domain,
    # Root,
    # Aspect,
    # Topic,
    # AuthorPublisherInfo,
    CallNumber,
)


# Call number models
class Institution(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False, unique=True)
    website = models.URLField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.name}"


class Article(models.Model):
    title = models.CharField()
    first_page = models.URLField(
        help_text="URL to image of the first page",
        blank=True,
        null=True,
    )
    published = models.DateTimeField(blank=True, null=True)
    added = models.DateTimeField(blank=False, null=True)
    institution = models.ManyToManyField(Institution)
    abstract = models.TextField(help_text="May be very large")
    doi = models.CharField(
        blank=True, null=True
    )  # Will need a special validator: https://docs.djangoproject.com/en/5.2/ref/validators/
    call_number = models.ForeignKey(
        CallNumber, on_delete=models.PROTECT, related_name="articles"
    )

    def __str__(self) -> str:
        return f"{self.title}"
