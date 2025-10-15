from django.urls import path
from . import views

app_name = 'municipios'

urlpatterns = [
    path('', views.index, name='index'),
    path('api/municipios/', views.municipios_por_estado, name='municipios_por_estado'),
]
