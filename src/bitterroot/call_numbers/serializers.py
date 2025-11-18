from rest_framework import serializers

from bitterroot.call_numbers.models import (
    Aspect,
    AuthorPublisher,
    CallNumber,
    Domain,
    Root,
    Subject,
    Topic,
)


class SubjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subject
        fields = [
            "name",
            "number",
        ]


class DomainSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Domain
        fields = [
            "name",
            "number",
            "subject",
        ]


class RootSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Root
        fields = [
            "name",
            "number",
            "domain",
        ]


class AspectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aspect
        fields = [
            "name",
            "number",
            "root",
        ]


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = [
            "name",
            "number",
            "aspect",
        ]


class AuthorPublisherSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AuthorPublisher
        fields = [
            "name",
            "number",
        ]


class CallNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CallNumber
        fields = [
            "subject",
            "domain",
            "root",
            "aspect",
            "topic",
            "author_pub",
        ]
