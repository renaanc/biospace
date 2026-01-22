from django.db import models
from parler.models import TranslatableModel, TranslatedFields
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User



class Author(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="author_profile"
    )
    display_name = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="authors/", blank=True, null=True)

    def __str__(self):
        return self.display_name
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


    author = models.ForeignKey(
        Author,
        on_delete=models.SET_NULL,
        null=True,
        related_name="articles"
    )

    published_at = models.DateTimeField(auto_now_add=True)

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