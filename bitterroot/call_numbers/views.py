from rest_framework.generics import ListAPIView, RetrieveAPIView

from bitterroot.call_numbers.models import (
    Aspect,
    AuthorPublisher,
    CallNumber,
    Domain,
    Root,
    Subdomain,
    Topic,
)
from bitterroot.call_numbers.serializers import (
    AspectSerializer,
    AuthorPublisherSerializer,
    CallNumberSerializer,
    DomainSerializer,
    RootSerializer,
    SubdomainSerializer,
    TopicSerializer,
)
from bitterroot.utils.filters import QueryFilter

# Create your views here.


# Domain
class DomainListView(ListAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    # permission_classes = [permissions.IsAuthenticated]


class DomainDetailView(RetrieveAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer


# Subdomain
class SubdomainListView(ListAPIView):
    queryset = Subdomain.objects.all()
    serializer_class = SubdomainSerializer

    filter_backends = [QueryFilter]
    filterset_db_field_suffix = "__number"
    filterset_fields = ["domain"]
    # permission_classes = [permissions.IsAuthenticated]


class SubdomainDetailView(RetrieveAPIView):
    queryset = Subdomain.objects.all()
    serializer_class = SubdomainSerializer


# Root
class RootListView(ListAPIView):
    queryset = Root.objects.all()
    serializer_class = RootSerializer

    filter_backends = [QueryFilter]
    filterset_db_field_suffix = "__number"
    filterset_fields = ["domain", "subdomain"]
    # permission_classes = [permissions.IsAuthenticated]


class RootDetailView(RetrieveAPIView):
    queryset = Root.objects.all()
    serializer_class = RootSerializer


# Aspect
class AspectListView(ListAPIView):
    queryset = Aspect.objects.all()
    serializer_class = AspectSerializer

    filter_backends = [QueryFilter]
    filterset_db_field_suffix = "__number"
    filterset_fields = ["root"]
    # permission_classes = [permissions.IsAuthenticated]


class AspectDetailView(RetrieveAPIView):
    queryset = Aspect.objects.all()
    serializer_class = AspectSerializer


# Topic
class TopicListView(ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    filter_backends = [QueryFilter]
    filterset_db_field_suffix = "__number"
    filterset_fields = ["aspect"]
    # permission_classes = [permissions.IsAuthenticated]


class TopicDetailView(RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


# Author Publisher
class AuthorPublisherListView(ListAPIView):
    queryset = AuthorPublisher.objects.all()
    serializer_class = AuthorPublisherSerializer

    filter_backends = [QueryFilter]
    filterset_db_field_suffix = "__number"
    filterset_fields = ["number"]
    # permission_classes = [permissions.IsAuthenticated]


class AuthorPublisherDetailView(RetrieveAPIView):
    queryset = AuthorPublisher.objects.all()
    serializer_class = AuthorPublisherSerializer


# Call Number
class CallNumberListView(ListAPIView):
    queryset = CallNumber.objects.all()
    serializer_class = CallNumberSerializer
    # permission_classes = [permissions.IsAuthenticated]

    filter_backends = [QueryFilter]
    filterset_db_field_suffix = "__number"
    filterset_fields = [
        "domain",
        "subdomain",
        "root",
        "aspect",
        "topic",
        "author",
    ]


class CallNumberDetailView(RetrieveAPIView):
    queryset = CallNumber.objects.all()
    serializer_class = CallNumberSerializer
