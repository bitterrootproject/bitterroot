from __future__ import annotations

from django.db import models


# Call number models
class Subject(models.Model):
    name = models.CharField()
    number = models.CharField(unique=True)

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Domain(models.Model):
    name = models.CharField()
    number = models.CharField()
    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT,
        related_name="domains",
    )

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Root(models.Model):
    name = models.CharField()
    number = models.CharField()
    domain = models.ForeignKey(
        Domain,
        on_delete=models.PROTECT,
        related_name="roots",
    )

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Aspect(models.Model):
    name = models.CharField()
    number = models.CharField()
    root = models.ForeignKey(
        Root,
        on_delete=models.PROTECT,
        related_name="aspects",
    )

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Topic(models.Model):
    name = models.CharField()
    number = models.CharField()
    aspect = models.ForeignKey(
        Aspect,
        on_delete=models.PROTECT,
        related_name="topics",
    )

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class AuthorPublisherInfo(models.Model):
    class Meta:
        verbose_name = "author or publisher"
        verbose_name_plural = "authors and publishers"

    name = models.CharField()
    number = models.CharField()

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class CallNumber(models.Model):
    subject = models.ForeignKey(
        Subject, on_delete=models.PROTECT, related_name="call_numbers"
    )
    domain = models.ForeignKey(
        Domain, on_delete=models.PROTECT, related_name="call_numbers"
    )
    root = models.ForeignKey(
        Root, on_delete=models.PROTECT, related_name="call_numbers"
    )
    aspect = models.ForeignKey(
        Aspect, on_delete=models.PROTECT, related_name="call_numbers"
    )
    topic = models.ForeignKey(
        Topic, on_delete=models.PROTECT, related_name="call_numbers"
    )
    author_pub = models.ForeignKey(
        AuthorPublisherInfo, on_delete=models.PROTECT, related_name="call_numbers"
    )

    def __str__(self) -> str:
        return f"{self.subject!r}/{self.domain!r} {self.root!r}.{self.aspect!r}.{self.topic!r} {self.author_pub!r}"


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
