from rest_framework import viewsets

from bitterroot.call_numbers.models import (
    Aspect,
    AuthorPublisher,
    CallNumber,
    Domain,
    Root,
    Subject,
    Topic,
)
from bitterroot.call_numbers.serializers import (
    AspectSerializer,
    AuthorPublisherSerializer,
    CallNumberSerializer,
    DomainSerializer,
    RootSerializer,
    SubjectSerializer,
    TopicSerializer,
)

# Create your views here.


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all().order_by("number")
    serializer_class = SubjectSerializer
    # permission_classes = [permissions.IsAuthenticated]


class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all().order_by("number")
    serializer_class = DomainSerializer
    # permission_classes = [permissions.IsAuthenticated]


class RootViewSet(viewsets.ModelViewSet):
    queryset = Root.objects.all().order_by("number")
    serializer_class = RootSerializer
    # permission_classes = [permissions.IsAuthenticated]


class AspectViewSet(viewsets.ModelViewSet):
    queryset = Aspect.objects.all().order_by("number")
    serializer_class = AspectSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all().order_by("number")
    serializer_class = TopicSerializer
    # permission_classes = [permissions.IsAuthenticated]


class AuthorPublisherViewSet(viewsets.ModelViewSet):
    queryset = AuthorPublisher.objects.all().order_by("number")
    serializer_class = AuthorPublisherSerializer
    # permission_classes = [permissions.IsAuthenticated]


class CallNumberViewSet(viewsets.ModelViewSet):
    queryset = CallNumber.objects.all()
    serializer_class = CallNumberSerializer
    # permission_classes = [permissions.IsAuthenticated]
