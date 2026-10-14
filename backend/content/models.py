from django.db import models


class HeroContent(models.Model):
    """Copy for the Home page hero. Only one row is ever used."""

    heading = models.CharField(max_length=120)
    description = models.TextField()
    cta_label = models.CharField(max_length=40)
    scroll_hint = models.CharField(max_length=60)
    closing_line = models.CharField(max_length=120)

    class Meta:
        verbose_name = "home hero content"
        verbose_name_plural = "home hero content"

    def __str__(self):
        return self.heading


class AboutPage(models.Model):
    """Heading and intro for the About page. Only one row is ever used."""

    title = models.CharField(max_length=120)
    lead = models.TextField()

    class Meta:
        verbose_name = "about page"
        verbose_name_plural = "about page"

    def __str__(self):
        return self.title


class AboutSection(models.Model):
    """One headed block of text on the About page."""

    page = models.ForeignKey(AboutPage, related_name="sections", on_delete=models.CASCADE)
    heading = models.CharField(max_length=120)
    body = models.TextField()
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.heading
