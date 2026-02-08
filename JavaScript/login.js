
  $(document).ready(function() {
    const EMAIL_CORRECTO = "admin@wallet.com";
    const PASS_CORRECTO = "1234";

    $('#loginForm').submit(function(event) {
      event.preventDefault();
      const email = $('#emailInput').val();
      const pass = $('#passwordInput').val();

      if (email === EMAIL_CORRECTO && pass === PASS_CORRECTO) {
        // Simula carga antes de redirigir
        $('#btnLogin').text("Cargando...").prop('disabled', true);
        setTimeout(function() {
          window.location.href = "menuAlkeWallet.html";
        }, 800);
      } else {
        $('#mensajeError').hide().fadeIn();
        $('#passwordInput').val("");
      }
    });
  });
