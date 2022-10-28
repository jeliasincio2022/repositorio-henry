Listar(1);
function Listar(pagina) {
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_MAQUINA&q=' + $("#buscar").val(),
        type: "POST",
        //dataType: "json",

        success: function (data) {
            //console.log(data)
            $("#lista").html(data);
        },
    });    
}

function abrirModal() {
    $("#maq_valor").val("1");
    $("#ModalRegistrar").modal("show");
    $("#maq_nombre").val("")
    $("#maq_area").val("")
    $("#maq_nombre").focus()
}

function editar(id, nombre,area) {
    $("#maq_id").val(id);
    $("#maq_nombre").val(nombre);
    $("#maq_area").val(area);
    $("#maq_valor").val("2");
    $("#ModalRegistrar").modal("show");
}

$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();

    $.ajax({

        url: 'controlador/Clogistica.php?op=NUEVO_MAQUINA',
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

function EliminarMaq($id) {
  swal({
    title: "Desea Eliminar Equipo ??",
    text: "Está seguro de Eliminar Equipo. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_MAQUINA', id:$id}, function (data) {
			if (data==1) {Listar();swal("Equipo Eliminado ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}

function PintarFilaMaq($id) {

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