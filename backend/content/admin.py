from django.contrib import admin

from .models import AboutPage, AboutSection, HeroContent


class SingletonAdmin(admin.ModelAdmin):
    """Allow adding only one row; edit it instead of creating more."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()


@admin.register(HeroContent)
class HeroContentAdmin(SingletonAdmin):
    pass


class AboutSectionInline(admin.StackedInline):
    model = AboutSection
    extra = 0


@admin.register(AboutPage)
class AboutPageAdmin(SingletonAdmin):
    inlines = [AboutSectionInline]
