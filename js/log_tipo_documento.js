Listar(1);

function Listar() {

  $.ajax({
    url: 'controlador/Clogistica.php?op=LIS_COMPROBANTE&q=' + $("#buscar").val(),
    type: "POST",
    //dataType: "json",

    success: function (data) {
      //console.log(data)
      $("#lista").html(data);
    },
  });
}

function abrirModal() {
  $("#comprobante_valor").val("1");
  $("#ModalRegistrar").modal("show");
  $("#comprobante_descripcion").val("")
  $("#comprobante_codigo").focus()
}

function editar($id) {
  $.post("controlador/Clogistica.php?op=EDITAR_COMPROBANTE", {
    id: $id
  }, function (data) {
    console.log(data);
    $("#comprobante_id").val(data.id);
    $("#comprobante_codigo").val(data.codigo);
    $("#comprobante_descripcion").val(data.descripcion);
    $("#comprobante_valor").val("2");
    $("#ModalRegistrar").modal("show");
  }, "JSON")
}

function EliminarUnidad($id) {
  swal({
    title: "Desea Eliminar tipo de documento ??",
    text: "Está seguro de Eliminar tipo de documento. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_COMPROBANTE', id:$id}, function (data) {
			if (data==1) {Listar();swal("Unidad de medida Eliminada ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}

$("#formRegistrar").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: 'controlador/Clogistica.php?op=NUEVO_COMPROBANTE',
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