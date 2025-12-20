from django.views.generic import TemplateView


class SvelteAppView(TemplateView):
    """
    Serve the SvelteKit app.
    """

    def get_template_names(self):
        # Return the path to SvelteKit's index.html
        return "index.html"


# class SvelteAppView(View):
#     """Serve the SvelteKit app."""

#     def get(self, request, *args, **kwargs):
#         index_path = settings.FRONTEND_BUILD_DIR / "index.html"

#         if not index_path.exists():
#             return HttpResponse(
#                 "Frontend not built.  Run 'npm run build' in the frontend directory.",
#                 status=503
#             )

#         with open(index_path, 'r', encoding='utf-8') as f:
#             return HttpResponse(f.read(), content_type='text/html')
