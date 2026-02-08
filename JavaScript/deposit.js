$(document).ready(function() {
    // 1. Obtener y mostrar saldo actual
    let saldoActual = parseFloat(localStorage.getItem('miSaldo')) || 60000;
    actualizarVistaSaldo(saldoActual);

    $('#btnRealizarDeposito').click(function() {
      const monto = parseFloat($('#depositAmount').val());

      // Validación
      if (isNaN(monto) || monto <= 0) {
        mostrarAlerta("Ingresa un monto válido.", "danger");
        return;
      }

      let nuevoSaldo = saldoActual + monto;
      localStorage.setItem('miSaldo', nuevoSaldo);

      // Guardar en historial
      let historial = JSON.parse(localStorage.getItem('historial')) || [];
      historial.push({
        tipo: 'Depósito',
        monto: monto,
        fecha: new Date().toLocaleString(),
        detalle: 'Carga de efectivo PC'
      });
      localStorage.setItem('historial', JSON.stringify(historial));

      // Mensaje
      $('#montoConfirmacion').text("Has depositado: $" + monto.toLocaleString()).fadeIn();
      mostrarAlerta("¡Depósito procesado con éxito!", "success");

      // Actualizar variable local y vista inmediatamente
      saldoActual = nuevoSaldo;
      actualizarVistaSaldo(saldoActual);

      // Deshabilitar botón y redirigir
      $(this).prop('disabled', true).css('opacity', '0.5');
      setTimeout(function() {
        window.location.href = "menuAlkeWallet.html";
      }, 2500);
    });

    function actualizarVistaSaldo(valor) {
      $('#displaySaldoActual').text('$' + valor.toLocaleString());
    }

    function mostrarAlerta(msj, tipo) {
      $('#alert-container').html(`
        <div class="alert alert-${tipo} fade show" style="border-radius:10px;">
          ${msj}
        </div>
      `);
    }
  });