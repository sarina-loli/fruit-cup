"""Seed the initial copy so the API works right after `migrate`.

Edit the text afterwards in the Django admin (/admin/).
"""
from django.db import migrations

HERO = {
    "heading": "A fruit cup, taken apart.",
    "description": (
        "Scroll down and one glass of fruit and dark juice lifts, turns and scatters. "
        "Scroll back up and it comes together again."
    ),
    "cta_label": "Read the story",
    "scroll_hint": "Scroll to take it apart",
    "closing_line": "Scroll back up to run it in reverse.",
}

ABOUT_TITLE = "One glass, taken apart slowly."
ABOUT_LEAD = (
    "Fruit Cup is a small website about looking closely. It has two pages and one object: "
    "a glass of fruit and dark juice that you can pull apart by scrolling."
)

ABOUT_SECTIONS = [
    (
        "What this site is",
        "Fruit Cup is a showcase for scroll-driven imagery. The home page pins a single "
        "animation to the screen and lets your scroll position decide which moment you see. "
        "There are no accounts, menus or shop windows around it. The animation is the whole point.",
    ),
    (
        "The fruit-cup concept",
        "A fruit cup looks like one thing, but it is really many small things held together: "
        "strawberries, orange segments, grapes and pineapple. The animation separates them. "
        "Scroll down and the cup turns while the pieces drift outward into a floating "
        "arrangement, each one easy to see on its own. Scroll up and they gather back into the glass.",
    ),
    (
        "How the animation works",
        "The motion is a sequence of 72 pre-rendered frames, drawn onto a canvas rather than "
        "played as video. Your scroll position is mapped to a point in that sequence, and the "
        "page blends between neighbouring frames so nothing snaps from one image to the next. "
        "Because position, not time, drives it, scrolling in reverse plays it in reverse.",
    ),
    (
        "How the site is built",
        "The pages are written in React. The text on both pages comes from a small Django REST "
        "API, so it can be edited in Django's admin without touching the front end.",
    ),
]


def seed(apps, schema_editor):
    HeroContent = apps.get_model("content", "HeroContent")
    AboutPage = apps.get_model("content", "AboutPage")
    AboutSection = apps.get_model("content", "AboutSection")

    if not HeroContent.objects.exists():
        HeroContent.objects.create(**HERO)

    if not AboutPage.objects.exists():
        page = AboutPage.objects.create(title=ABOUT_TITLE, lead=ABOUT_LEAD)
        for order, (heading, body) in enumerate(ABOUT_SECTIONS):
            AboutSection.objects.create(page=page, heading=heading, body=body, order=order)


class Migration(migrations.Migration):
    dependencies = [("content", "0001_initial")]
    operations = [migrations.RunPython(seed, migrations.RunPython.noop)]
