
  $(document).ready(function() {
    // 1. Lógica del Saldo
    const saldoGuardado = localStorage.getItem('miSaldo');
    if (saldoGuardado !== null) {
      $('#saldoDisplay').text("$" + saldoGuardado);
    } else {
      const saldoInicial = 60000;
      localStorage.setItem('miSaldo', saldoInicial);
      $('#saldoDisplay').text("$" + saldoInicial);
    }

    // 2. Función para redirigir con mensaje
    function irAPantalla(nombrePantalla, url) {
      $('#mensajeRedireccion')
        .text("Abriendo " + nombrePantalla + "...")
        .fadeIn();

      setTimeout(function() {
        window.location.href = url;
      }, 800);
    }

    // 3. Eventos en botones 
    $('#btnDepositos').click(function() {
      irAPantalla("Depósitos", "depositAlkeWallet.html");
    });

    $('#btnEnviar').click(function() {
      irAPantalla("Enviar Dinero", "sendmoneyAlkeWallet.html");
    });

    $('#btnMovimientos').click(function() {
      irAPantalla("Movimientos", "transactionsAlkeWallet.html");
    });

    $('#btnCerrarSesion').click(function() {
      // Redirigir al login 
      window.location.href = "Index.html"; 
    });
  });
