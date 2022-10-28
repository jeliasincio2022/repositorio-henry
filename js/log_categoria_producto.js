Listar(1);

function Listar() {

  $.ajax({
    url: 'controlador/Clogistica.php?op=LIS_CAT&q=' + $("#buscar").val(),
    type: "POST",
    //dataType: "json",

    success: function (data) {
      //console.log(data)
      $("#lista").html(data);
    },
  });
}

function abrirModal() {
  $("#cat_valor").val("1");
  $("#ModalRegistrar").modal("show");
  $("#cat_nombre").val("")
  $("#cat_nombre").focus()
}

function editar($id) {
  $.post("controlador/Clogistica.php?op=LLENAR_CAT", {
    id: $id
  }, function (data) {
    console.log(data);
    $("#cat_id").val(data.id);
    $("#cat_nombre").val(data.nombre);
    $("#cat_valor").val("2");
    $("#ModalRegistrar").modal("show");
  }, "JSON")
}

function EliminarCat($id) {
  swal({
    title: "Desea Eliminar Categoria ??",
    text: "Está seguro de Eliminar Categoria. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_CAT', id:$id}, function (data) {
			if (data==1) {Listar();swal("Proveedor Eliminado ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}

$("#formRegistrar").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: 'controlador/Clogistica.php?op=NUEVO_CAT',
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

function PintarFilaCat($id) {

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