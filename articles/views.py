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

    # 1. Pega o IP real do visitante (essencial para o Render)
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')

    # 2. Tenta criar o like. 
    # Se já existir um like com esse IP e Artigo, 'created' será False.
    like, created = ArticleLike.objects.get_or_create(
        article=article,
        ip_address=ip
    )

    # 3. Retorna a resposta baseada se o like foi criado AGORA ou não
    return JsonResponse({
        "liked": created, 
        "likes_count": article.likes.count()
    })
