let contactoElegido = "";

  $(document).ready(function() {

    // 1. Buscador
    $("#buscador").on("keyup", function() {
      let valor = $(this).val().toLowerCase();
      $(".contacto-item").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(valor) > -1);
      });
    });

    // 2. Selección de contacto
    $("#listaContactos").on("click", ".contacto-item", function() {
      $(".contacto-item").removeClass("seleccionado");
      $(this).addClass("seleccionado");
      
      contactoElegido = $(this).data("nombre");
      $("#txtDestinatario").html("Enviando a: <b>" + contactoElegido + "</b>");
      $("#btnEjecutar").fadeIn(); // Mostrar botón
    });

    // 3. Agregar contacto
    $("#btnGuardar").click(function() {
      let nom = $("#nuevoNombre").val();
      let ali = $("#nuevoAlias").val();
      
      if(nom && ali) {
        $("#listaContactos").append(`
          <div class="contacto-item" data-nombre="${nom}">
            ${nom} <br> <small>Alias: ${ali}</small>
          </div>
        `);
        $("#modalNuevo").modal("hide");
        $("#nuevoNombre, #nuevoAlias").val("");
      }
    });

    // 4. Envío
    $("#btnEjecutar").click(function() {
      let monto = parseFloat($("#monto").val());
      let saldoActual = parseFloat(localStorage.getItem('miSaldo')) || 60000;

      if (!monto || monto <= 0) {
        alert("Ingrese un monto válido");
        return;
      }

      if (monto > saldoActual) {
        alert("saldo insuficiente. Saldo: $" + saldoActual);
        return;
      }

      // Resta  de saldo y guardar
      localStorage.setItem('miSaldo', saldoActual - monto);

      // Mensaje transferencia realizada
      $("#alerta").removeClass("d-none alert-danger").addClass("alert-success")
                 .text("Transferencia realizada con exito.");
      
      $(this).prop("disabled", true).text("Procesando...");

      setTimeout(() => {
        window.location.href = "menuAlkeWallet.html"; // Redirigir
      }, 2000);
    });

  });