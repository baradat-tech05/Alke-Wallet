  $(document).ready(function() {

    // Lista
    function cargarMovimientos(filtro = "todos") {
      const $contenedor = $('#listaMovimientos');
      const $mensaje = $('#mensajeVacio');
      
      $contenedor.empty();

      // Obtenemos los datos de LocalStorage
      const historial = JSON.parse(localStorage.getItem('historial')) || [];

      // Aplicar filtro
      const filtrados = historial.filter(mov => {
        return filtro === "todos" || mov.tipo === filtro;
      });

      if (filtrados.length === 0) {
        $mensaje.show();
      } else {
        $mensaje.hide();
        
        // .reverse() ordenar lo más nuevo primero
        filtrados.reverse().forEach(mov => {
          
        
          const esMas = mov.tipo === 'Depósito';
          const textoEtiqueta = esMas ? 'INGRESO' : 'EGRESO';
          const claseBadge = esMas ? 'badge-success' : 'badge-danger';
          const claseMonto = esMas ? 'monto-positivo' : 'monto-negativo';
          const signo = esMas ? '+' : '-';

          const cardHTML = `
            <div class="movimiento-card">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="badge-tipo badge ${claseBadge}">${textoEtiqueta}</span>
                  <h6 class="mb-0 font-weight-bold text-dark">${mov.tipo}</h6>
                  <small class="text-muted">${mov.fecha}</small>
                </div>
                <div class="text-right">
                  <div class="${claseMonto}">${signo} $${mov.monto.toLocaleString()}</div>
                  <small class="text-secondary d-block">${mov.detalle}</small>
                </div>
              </div>
            </div>
          `;
          $contenedor.append(cardHTML);
        });
      }
    }

    // Cambio de filtro
    $('#filtroTipo').on('change', function() {
      cargarMovimientos($(this).val());
    });

    // Limpiar historial (Para estudio de vaciado de datos)
    $('#btnLimpiar').click(function() {
      if(confirm("¿Seguro que quieres borrar todo el historial?")) {
        localStorage.removeItem('historial');
        cargarMovimientos();
      }
    });

    // CARGA INICIAL
    cargarMovimientos();
  });