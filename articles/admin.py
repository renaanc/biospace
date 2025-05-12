from django.contrib import admin
from parler.admin import TranslatableAdmin
from .models import Article

@admin.register(Article)
class ArticleAdmin(TranslatableAdmin):
    list_display = ('title', 'slug', 'created_at')
    search_fields = ('translations__title', 'translations__content')
    ordering = ('-created_at',)
