from __future__ import annotations

import operator
from functools import reduce

# from abc import ABC, abstractmethod
from django.db.models import Q, QuerySet
from rest_framework import filters
from rest_framework.request import Request
from rest_framework.views import APIView


class QueryFilter(filters.BaseFilterBackend):
    """
    Custom backend for query filters. Parses kwarg URL parameters that follow these examples:

    - `/cn/subdomains/?domain=LN,MU` - Get all subdomains under Language/Linguistics (LN) or Music (MU)
    - `/cn/cn/?domain=LN,subdomain=TU,subject=838` - Get all call numbers starting with LN/TU 838
    """

    # https://www.django-rest-framework.org/api-guide/filtering/#custom-generic-filtering
    def filter_queryset(self, request: Request, queryset: QuerySet, view: APIView):
        url_fields: list[str] = getattr(view, "filterset_fields")
        db_field_suffix: list[str] | str = getattr(view, "filterset_db_field_suffix")

        db_fields: list[str] = []
        if isinstance(db_field_suffix, list):
            db_fields = [f + s for f, s in zip(url_fields, db_field_suffix)]
        else:
            db_fields = [f + db_field_suffix for f in url_fields]

        and_filter_constraints: dict[str, str] = {}
        or_filter_constraints: list[Q] = []

        for uf, df in zip(url_fields, db_fields):
            if raw_value := request.query_params.get(uf, None):
                if len(split_values := raw_value.split(",")) == 1:
                    and_filter_constraints[df] = raw_value
                else:
                    # The `Q` object lets us run "or" queries.
                    # https://docs.djangoproject.com/en/dev/topics/db/queries/#complex-lookups-with-q-objects
                    or_filter_constraints += [Q(**{df: v}) for v in split_values]

        # raise Exception(and_filter_constraints, or_filter_constraints)

        # Both AND and OR filter constraints are given
        if and_filter_constraints and or_filter_constraints:
            return queryset.filter(
                # This code is from this StackOverflow post: https://stackoverflow.com/a/34739887
                # The `operator.or_` function puts the bitwise OR operator `|` between its two arguments
                # The `reduce` function applies the i-th and (i+1)-th parameter as arguments to the `operator.or_` function
                reduce(operator.or_, or_filter_constraints),
                **and_filter_constraints,
            )
        # Only AND
        elif and_filter_constraints and not or_filter_constraints:
            return queryset.filter(**and_filter_constraints)
        # Only OR
        elif not and_filter_constraints and or_filter_constraints:
            return queryset.filter(
                reduce(operator.or_, or_filter_constraints),
            )
        # No filter constraints given, return them all
        else:
            return queryset
