from django.shortcuts import render
from django.http import HttpResponse

# Exemplo de view para a home
def home(request):
    return render(request, 'core/home.html')

# Exemplo de view para a página sobre
def about(request):
    return render(request, 'core/about.html')

# Exemplo de view para a página de contato
def contact(request):
    return render(request, 'core/contact.html')
