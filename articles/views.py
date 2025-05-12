from django.shortcuts import render, get_object_or_404
from .models import Article  # Certifique-se de importar seu modelo de artigo

# Exemplo de view para listar os artigos
def article_list(request):
    articles = Article.objects.all()  # Recupera todos os artigos
    return render(request, 'articles/article_list.html', {'articles': articles})

# Exemplo de view para exibir um artigo específico
def article_detail(request, slug):
    article = get_object_or_404(Article, slug=slug)  # Busca o artigo pelo slug
    return render(request, 'articles/article_detail.html', {'article': article})
