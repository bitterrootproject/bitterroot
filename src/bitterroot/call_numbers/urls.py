from django.urls import include, path
from rest_framework import routers

from bitterroot.call_numbers.views import (
    AspectViewSet,
    AuthorPublisherViewSet,
    CallNumberViewSet,
    DomainViewSet,
    RootViewSet,
    SubjectViewSet,
    TopicViewSet,
)

app_name = "cn"

router = routers.DefaultRouter()
router.register(r"subjects", SubjectViewSet)
router.register(r"domains", DomainViewSet)
router.register(r"roots", RootViewSet)
router.register(r"aspects", AspectViewSet)
router.register(r"topics", TopicViewSet)
router.register(r"ap", AuthorPublisherViewSet)
router.register(r"cn", CallNumberViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
