# articles/views.py
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_POST
from .models import Article, ArticleLike
from .models import Article  # Certifique-se de importar seu modelo de artigo

# Exemplo de view para listar os artigos
def article_list(request):
    articles = Article.objects.all()  # Recupera todos os artigos
    return render(request, 'articles/article_list.html', {'articles': articles})

# Exemplo de view para exibir um artigo específico
def article_detail(request, slug):
    article = get_object_or_404(Article, slug=slug)  # Busca o artigo pelo slug
    return render(request, 'articles/article_detail.html', {'article': article})


@require_POST
def like_article(request, slug):
    article = get_object_or_404(Article, slug=slug)

    ip = request.META.get("REMOTE_ADDR")

    like, created = ArticleLike.objects.get_or_create(
        article=article,
        ip_address=ip
    )

    if not created:
        return JsonResponse({
            "liked": False,
            "likes_count": article.likes.count()
        })

    return JsonResponse({
        "liked": True,
        "likes_count": article.likes.count()
    })
