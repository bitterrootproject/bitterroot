from django.db import models
from django.db.models import Q

# Create your models here.

# class Super_Root(models.Model):
#     pass


# class Super_CallNumberComponent(models.Model):
#     class Meta:
#         abstract = True

# name = models.CharField()
# number = models.CharField()

#     @classmethod
#     def get_default_pk(cls):
#         obj, _ = cls.objects.get_or_create(
#             name='default',
#             number='default',
#             defaults=dict(description="This is not a valid BCS call number component."),
#         )
#         return obj.pk


# def __str__(self) -> str:
#     return f"{self.number}: {self.name}"

# def __repr__(self) -> str:
#     return f"{self.number}"


class Domain(models.Model):
    name = models.CharField()
    number = models.CharField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "number"], name="unique_domain_name_and_number"
            )
        ]

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Subdomain(models.Model):
    name = models.CharField()
    number = models.CharField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "number", "domain"],
                name="unique_subdomain_name_number_and_domain",
            )
        ]

    domain = models.ForeignKey(
        Domain,
        on_delete=models.CASCADE,
        related_name="domains",
    )

    def __str__(self) -> str:
        return f"{str(self.domain)} / {self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Root(models.Model):
    name = models.CharField()
    number = models.CharField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "number", "domain", "subdomain"],
                name="unique_root_name_number_and_parent",
            ),
            models.CheckConstraint(
                condition=Q(domain__isnull=False) ^ Q(subdomain__isnull=False),
                name="root_either_domain_or_subdomain",  # Unique constraint name
            ),
        ]

    domain = models.ForeignKey(
        Domain,
        on_delete=models.CASCADE,
        related_name="roots",
        blank=True,
        null=True,
    )

    subdomain = models.ForeignKey(
        Subdomain,
        on_delete=models.CASCADE,
        related_name="roots",
        blank=True,
        null=True,
    )

    def __str__(self) -> str:
        parent = str(
            self.domain
            if self.domain
            else self.subdomain
            if self.subdomain
            else "unknown"
        )
        return f"{parent} / {self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Aspect(models.Model):
    name = models.CharField()
    number = models.CharField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "number", "root"],
                name="unique_aspect_name_number_and_root",
            )
        ]

    root = models.ForeignKey(
        Root,
        on_delete=models.CASCADE,
        related_name="aspects",
        # default=Super_CallNumberComponent.get_default_pk,
    )

    def __str__(self) -> str:
        return f"{self.root.number}: {self.root.name} / {self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class Topic(models.Model):
    name = models.CharField()
    number = models.CharField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "number", "aspect"],
                name="unique_topic_name_number_and_aspect",
            )
        ]

    aspect = models.ForeignKey(
        Aspect,
        on_delete=models.CASCADE,
        related_name="topics",
    )

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class AuthorPublisher(models.Model):
    class Meta:
        verbose_name = "author or publisher"
        verbose_name_plural = "authors and publishers"
        constraints = [
            models.UniqueConstraint(
                fields=["name", "number"], name="unique_authorpub_name_and_number"
            )
        ]

    name = models.CharField()
    number = models.CharField()

    def __str__(self) -> str:
        return f"{self.number}: {self.name}"

    def __repr__(self) -> str:
        return f"{self.number}"


class CallNumber(models.Model):
    domain = models.ForeignKey(
        Domain,
        on_delete=models.PROTECT,
        related_name="call_numbers",
    )

    subdomain = models.ForeignKey(
        Subdomain,
        on_delete=models.PROTECT,
        related_name="call_numbers",
        blank=True,
        null=True,
    )

    root = models.ForeignKey(
        Root,
        on_delete=models.PROTECT,
        related_name="call_numbers",
    )

    aspect = models.ForeignKey(
        Aspect,
        on_delete=models.PROTECT,
        related_name="call_numbers",
        blank=True,
        null=True,
    )

    topic = models.ForeignKey(
        Topic,
        on_delete=models.PROTECT,
        related_name="call_numbers",
        blank=True,
        null=True,
    )

    author_pub = models.ForeignKey(
        AuthorPublisher,
        on_delete=models.PROTECT,
        related_name="call_numbers",
        blank=True,
        null=True,
    )

    def __str__(self) -> str:
        cn_string = ""

        cn_string += self.domain.number  # required
        cn_string += "/" + self.subdomain.number if self.subdomain else ""

        cn_string += " " + self.root.number  # required
        cn_string += "." + self.aspect.number if self.aspect else ""
        cn_string += "." + self.topic.number if self.topic and self.aspect else ""

        cn_string += self.author_pub.number if self.author_pub else ""
        # return f"{self.domain.number}/{self.domain!r} {self.root!r}.{self.aspect!r}.{self.topic!r} {self.author_pub!r}"

        return cn_string

    @property
    def formatted(self) -> str:
        return str(self)
