document.addEventListener('DOMContentLoaded', function () {
  const estadoSelect = document.getElementById('estado-select');
  const municipioSelect = document.getElementById('municipio-select');
  const mensaje = document.getElementById('mensaje');

  estadoSelect.addEventListener('change', async function () {
    const estadoId = this.value;
    municipioSelect.innerHTML = '';
    if (!estadoId) {
      municipioSelect.disabled = true;
      municipioSelect.innerHTML = '<option value="">-- Primero selecciona un estado --</option>';
      return;
    }

    municipioSelect.disabled = true;

    try {
      const url = `/api/municipios/?estado_id=${encodeURIComponent(estadoId)}`;
      const resp = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error('Error en la petición: ' + resp.status + ' ' + text);
      }

      const data = await resp.json();
      if (!data.ok) {
        throw new Error(data.error || 'Respuesta inesperada');
      }

      municipioSelect.innerHTML = '<option value="">-- Selecciona un municipio --</option>';
      data.municipios.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.nombre;
        municipioSelect.appendChild(opt);
      });

      municipioSelect.disabled = false;
    } catch (err) {
      mensaje.textContent = 'Error al cargar municipios: ' + err.message;
      municipioSelect.disabled = true;
      municipioSelect.innerHTML = '<option value="">-- No disponible --</option>';
      console.error(err);
    }
  });
});
