"""
URL configuration for bitterroot project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path, re_path

from bitterroot.root.views import SvelteAppView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v0/cn/", include("bitterroot.call_numbers.urls", namespace="cn")),
    path("api/v0/auth/", include("rest_framework.urls", namespace="rest_framework")),
    # path("", TemplateView.as_view(template_name='static/index.html'), name="svelte-root"),
    # re_path(r"^(?!(_app|static|media|admin)/).*$", SvelteAppView.as_view(), name="svelte-app")
    # re_path(
    #     r'^static/_app/(?P<path>. *)$',
    #     serve,
    #     {'document_root': settings.STATIC_ROOT / '_app'},
    #     name='svelte-assets'
    # ),
    re_path(r"^.*$", SvelteAppView.as_view(), name="svelte-app"),
]

# # Serve static files in development
# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
