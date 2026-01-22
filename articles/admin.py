from django.contrib import admin
from parler.admin import TranslatableAdmin
from .models import Article, Author


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("display_name", "user")

@admin.register(Article)
class ArticleAdmin(TranslatableAdmin):
    list_display = ('title', 'slug', 'created_at', 'get_image_caption')
    search_fields = ('translations__title', 'translations__content')
    ordering = ('-created_at',)

    def get_image_caption(self, obj):
        return obj.image_caption
    get_image_caption.short_description = 'Legenda'