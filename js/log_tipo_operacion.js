Listar(1);

function Listar() {

  $.ajax({
    url: 'controlador/Clogistica.php?op=LIS_OPERACION&q=' + $("#buscar").val(),
    type: "POST",
    //dataType: "json",

    success: function (data) {
      //console.log(data)
      $("#lista").html(data);
    },
  });
}

function abrirModal() {
  $("#operacion_valor").val("1");
  $("#ModalRegistrar").modal("show");
  $("#operacion_descripcion").val("")
  $("#operacion_codigo").focus()
}

function editar($id) {
  $.post("controlador/Clogistica.php?op=EDITAR_OPERACION", { id: $id }, function (data) {
    console.log(data);
    $("#operacion_id").val(data.id);
    $("#operacion_codigo").val(data.codigo);
    $("#operacion_descripcion").val(data.descripcion);
    $("#operacion_valor").val("2");
    $("#ModalRegistrar").modal("show");
  }, "JSON")
}

function EliminarOperacion($id) {
  swal({
    title: "Desea Eliminar tipo de operación ??",
    text: "Está seguro de Eliminar tipo de operación. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_OPERACION', id:$id}, function (data) {
			if (data==1) {Listar();swal("Tipo de operación Eliminada ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}

$("#formRegistrar").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: 'controlador/Clogistica.php?op=NUEVO_OPERACION',
    type: "POST",
    data: $(this).serialize(),

    success: function (data) {
      $('#ModalRegistrar').modal('hide');
      Listar(1);
      console.log(data);
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
      console.log(e);
      swal("Datos no registrados Correctamente ..", "Error", "error");
    }
  });
});

function PintarFilaExist($id) {

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