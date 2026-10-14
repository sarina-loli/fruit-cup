from rest_framework import serializers

from .models import AboutPage, AboutSection, HeroContent


class HeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = ["heading", "description", "cta_label", "scroll_hint", "closing_line"]


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ["id", "heading", "body"]


class AboutPageSerializer(serializers.ModelSerializer):
    sections = AboutSectionSerializer(many=True, read_only=True)

    class Meta:
        model = AboutPage
        fields = ["title", "lead", "sections"]
