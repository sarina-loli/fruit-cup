from django.http import Http404
from rest_framework.generics import RetrieveAPIView

from .models import AboutPage, HeroContent
from .serializers import AboutPageSerializer, HeroContentSerializer


class SingletonRetrieveView(RetrieveAPIView):
    """Return the first (and only) row of `queryset`, or 404 if none exists."""

    def get_object(self):
        obj = self.get_queryset().first()
        if obj is None:
            raise Http404("Content has not been created yet.")
        return obj


class HomeContentView(SingletonRetrieveView):
    queryset = HeroContent.objects.all()
    serializer_class = HeroContentSerializer


class AboutContentView(SingletonRetrieveView):
    queryset = AboutPage.objects.prefetch_related("sections")
    serializer_class = AboutPageSerializer
