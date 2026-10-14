from django.urls import path

from .views import AboutContentView, HomeContentView

urlpatterns = [
    path("home/", HomeContentView.as_view(), name="home-content"),
    path("about/", AboutContentView.as_view(), name="about-content"),
]
