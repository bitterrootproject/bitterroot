from django.urls import path

from bitterroot.call_numbers.views import (
    AspectDetailView,
    AspectListView,
    AuthorPublisherDetailView,
    AuthorPublisherListView,
    CallNumberDetailView,
    CallNumberListView,
    DomainDetailView,
    DomainListView,
    RootDetailView,
    RootListView,
    SubjectDetailView,
    SubjectListView,
    TopicDetailView,
    TopicListView,
)

app_name = "cn"

urlpatterns = [
    path("subjects/", SubjectListView.as_view()),
    path("subjects/<int:pk>", SubjectDetailView.as_view()),
    path("domains/", DomainListView.as_view()),
    path("domains/<int:pk>", DomainDetailView.as_view()),
    path("roots/", RootListView.as_view()),
    path("roots/<int:pk>", RootDetailView.as_view()),
    path("aspects/", AspectListView.as_view()),
    path("aspects/<int:pk>", AspectDetailView.as_view()),
    path("topics/", TopicListView.as_view()),
    path("topics/<int:pk>", TopicDetailView.as_view()),
    # authors and publishers
    path("ap/", AuthorPublisherListView.as_view()),
    path("ap/<int:pk>", AuthorPublisherDetailView.as_view()),
    # call numbers
    path("cn/", CallNumberListView.as_view()),
    path("cn/<int:pk>", CallNumberDetailView.as_view()),
]
