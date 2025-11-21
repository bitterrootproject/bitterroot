from rest_framework.serializers import ModelSerializer

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


class CallNumberSerializer(ModelSerializer):
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
