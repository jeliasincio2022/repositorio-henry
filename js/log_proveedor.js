Listar(1);

$(document).ready(function () {
  $("#ModalRegistrar").on('shown.bs.modal', function () {
    $(this).find('#prov_documento').focus();
  });

  $("#prov_documento").keypress(function (e) {
    if (e.which == 13) {
      ConsultaRuc();
    }
  })
});

function limpiar_campos() {
  $("#prov_documento,#prov_nombre,#prov_nombre_comercial,#prov_direccion,#prov_estado_contribuyente,#prov_condicion,#prov_telefono,#prov_contacto,#prov_correo,#prov_numero_cuenta").val("");
}

function ConsultaRuc() {
  var $ruc = $('#prov_documento').val();

  $("#IdCargando").show();
  $.ajax({
    type: 'POST',
    url: 'controlador/Clogistica.php',
    data: {
      op: 'CONSULTA_RUC',
      ruc: $ruc
    },
    dataType: "JSON",
    success: function (datos) {

      if (datos == 0) {
        limpiar_campos();
        swal("RUC no se encuentra en la Busqueda ..", "Error", "error");
        $("#IdCargando").hide();
        return false;
      }
      $('#prov_nombre').val(datos[1]);
      $('#prov_direccion').val(datos[2]);
      $("#IdCargando").hide();
    }
  });

}

function Listar() {

  $.ajax({
    url: 'controlador/Clogistica.php?op=LIS_PROV&q=' + $("#buscar").val(),
    type: "POST",
    /*dataType: "json",*/

    success: function (data) {
      /*console.log(data)*/
      $("#lista").html(data);
    },
  });
}

function ExcelProveedor(){				 
    $buscar=$("#buscar").val()
    location.href="Librerias/PhpSpreadsheet/ExcelProveedores.php?buscar="+$buscar
}

function abrirModal() {
  $("#prov_valor").val("1");
  $("#ModalRegistrar").modal("show");
  $("#prov_nombre").focus()
}

function PintarFilaProv($id) {

  var $idfilaanterior = $("#IdFilaUsu").val()
  var $par = $idfilaanterior.split('_')
  var $par_int = parseInt($par[1])

  var $par = $idfilaanterior.split('_')
  var $par_int = parseInt($par[1])
  if ($par_int % 2 == 0) {
    // alert("hola")
    $("#" + $idfilaanterior).css({
      "background-color": "#f5f5f5",
      "color": "#000000"
    })
  } else {
    $("#" + $idfilaanterior).css({
      "background-color": "#FFFFFF",
      "color": "#000000"
    })
  }
  $("#" + $id).css({
    "background-color": "#438EB9",
    "color": "#FFFFFF"
  })
  $("#IdFilaUsu").val($id)

}

function editar($id) {
  $.post("controlador/Clogistica.php?op=LLENAR_PROV", {id: $id}, function (data) {
    //console.log(data);

    $("#prov_id").val(data.id);
    $("#prov_nombre").val(data.nombre);
    $("#prov_contacto").val(data.contacto);
    $("#prov_correo").val(data.email);
    $("#prov_telefono").val(data.telefono);
    $("#prov_direccion").val(data.direccion);
    $("#prov_documento").val(data.documento);
    $("#prov_estado_contribuyente").val(data.estado);
    $("#prov_condicion_contribuyente").val(data.condicion_contribuyente);
    $("#prov_nombre_comercial").val(data.nombre_comercial);
    $("#prov_condicion_pago").val(data.condicion_pago);
    $("#prov_banco").val(data.banco);
    $("#prov_tipo_cuenta").val(data.tipo_cuenta);
    $("#prov_numero_cuenta").val(data.numero_cuenta);

    $("#prov_valor").val("2");

    $("#ModalRegistrar").modal("show");
  }, "JSON")
}


$("#formRegistrar").on("submit", function (e) {
  e.preventDefault();

  $.ajax({

    url: 'controlador/Clogistica.php?op=NUEVO_PROV',
    type: "POST",
    data: $(this).serialize(),

    success: function (data) {
      $('#ModalRegistrar').modal('hide');
      Listar(1);
      //console.log(data);

      $('#formRegistrar').trigger("reset");
      if (data == 1) {
        swal("Datos registrados Correctamente ..", "Felicitaciones", "success");
        return false;
      } else
      if (data == 0) {
        swal("Datos no registrados Correctamente ..", "Error", "error");
        return false;
      } else {
        swal("Datos no registrados Correctamente ..", "Error", "error");
      }
    },
    error: function (e) {
      //console.log(e);
      swal("Datos no registrados Correctamente ..", "Error", "error");
    }
  });
});
function EliminarProv($id) {
  swal({
    title: "Desea Eliminar Proveedor ??",
    text: "Está seguro de Eliminar Proveedor. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_PROV', id:$id}, function (data) {
			if (data==1) {Listar();swal("Proveedor Eliminado ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}
