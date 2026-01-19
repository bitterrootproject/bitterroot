from rest_framework.serializers import ModelSerializer, Serializer

from bitterroot.call_numbers.models import (
    Aspect,
    AuthorPublisher,
    CallNumber,
    Domain,
    Root,
    Subject,
    Topic,
)


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = [
            "id",
            "name",
            "number",
        ]


class DomainSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = [
            "id",
            "name",
            "number",
            # "subject",
        ]


class RootSerializer(ModelSerializer):
    class Meta:
        model = Root
        fields = [
            "id",
            "name",
            "number",
            "domain",
        ]


class AspectSerializer(ModelSerializer):
    class Meta:
        model = Aspect
        fields = [
            "id",
            "name",
            "number",
            "root",
        ]


class TopicSerializer(ModelSerializer):
    class Meta:
        model = Topic
        fields = [
            "id",
            "name",
            "number",
            "aspect",
        ]


class AuthorPublisherSerializer(ModelSerializer):
    class Meta:
        model = AuthorPublisher
        fields = [
            "id",
            "name",
            "number",
        ]


# Nested serializers for CallNumber - only id, number, name
class SubjectNestedSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "number", "name"]


class DomainNestedSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = ["id", "number", "name"]


class RootNestedSerializer(ModelSerializer):
    class Meta:
        model = Root
        fields = ["id", "number", "name"]


class AspectNestedSerializer(ModelSerializer):
    class Meta:
        model = Aspect
        fields = ["id", "number", "name"]


class TopicNestedSerializer(ModelSerializer):
    class Meta:
        model = Topic
        fields = ["id", "number", "name"]


class AuthorPublisherNestedSerializer(ModelSerializer):
    class Meta:
        model = AuthorPublisher
        fields = ["id", "number", "name"]


class CallNumberSerializer(ModelSerializer):
    subject: Serializer = SubjectNestedSerializer(read_only=True)  # type: ignore[assignment]
    domain: Serializer = DomainNestedSerializer(read_only=True)  # type: ignore[assignment]
    root: Serializer = RootNestedSerializer(read_only=True)  # type: ignore[assignment]
    aspect: Serializer = AspectNestedSerializer(read_only=True)  # type: ignore[assignment]
    topic: Serializer = TopicNestedSerializer(read_only=True)  # type: ignore[assignment]
    author_pub: Serializer = AuthorPublisherNestedSerializer(read_only=True)  # type: ignore[assignment]

    class Meta:
        model = CallNumber
        fields = [
            "id",
            "subject",
            "domain",
            "root",
            "aspect",
            "topic",
            "author_pub",
            "formatted",  # pretty formatting
        ]
