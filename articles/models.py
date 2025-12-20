from django.db import models
from parler.models import TranslatableModel, TranslatedFields
from ckeditor.fields import RichTextField


class Article(TranslatableModel):
    slug = models.SlugField(max_length=50, unique=True)
    image = models.URLField(null=True, blank=True)
    thumbnail = models.URLField(null=True, blank=True)
    source = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    translations = TranslatedFields(
        title=models.CharField(max_length=200),
        content = RichTextField(),
        summary=models.TextField(blank=True),
        image_caption = models.CharField(max_length=255, blank=True, verbose_name="Legenda da imagem"),
    )

    def __str__(self):
        return self.safe_translation_getter('title', any_language=True)


class ArticleLike(models.Model):
    article = models.ForeignKey(
        "articles.Article",
        on_delete=models.CASCADE,
        related_name="likes"
    )
    ip_address = models.GenericIPAddressField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("article", "ip_address")