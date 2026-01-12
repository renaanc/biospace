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

def simulator(request):
    return render(request, "core/simulator.html"),

def astrobiology(request):

    return render(request, 'core/astrobiology.html', {
    'title': 'Astrobiology',
})

def extremophiles(request):
    return render(request, 'core/extremophiles.html', {
        'title': 'Extremophiles',
    })

def earth_analogs(request):
    return render(request, 'core/earth_analogs.html', {
        'title': 'Earth Analogs',
    })