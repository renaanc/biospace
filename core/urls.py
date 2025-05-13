from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('astrobiology/', views.astrobiology, name='astrobiology'),
    path('extremophiles/', views.extremophiles, name='extremophiles'),
    path('earth-analogs/', views.earth_analogs, name='earth_analogs'),
]

