from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Estado, Municipio

def index(request):
    estados = Estado.objects.all().order_by('nombre')
    return render(request, 'municipios/index.html', {'estados': estados})

def municipios_por_estado(request):
    """
    Endpoint que devuelve JSON con municipios de un estado.
    Espera: GET ?estado_id=ID
    """
    estado_id = request.GET.get('estado_id')
    if not estado_id:
        return JsonResponse({'ok': False, 'error': 'estado_id requerido'}, status=400)

    try:
        estado = get_object_or_404(Estado, pk=int(estado_id))
    except ValueError:
        return JsonResponse({'ok': False, 'error': 'estado_id inválido'}, status=400)

    municipios = estado.municipios.all().order_by('nombre').values('id', 'nombre')
    municipios_list = list(municipios)
    return JsonResponse({'ok': True, 'municipios': municipios_list})
