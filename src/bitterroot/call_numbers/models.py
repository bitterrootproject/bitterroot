from django.db import models

# Create your models here.
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
