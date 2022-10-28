var $sucursal = $("#alm_sucursal").select2({ dropdownAutoWidth: true, width: '100%' });
Listar(1);
function Listar() {
    
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_ALM&q=' + $("#buscar").val(),
        type: "POST",
        //dataType: "json",

        success: function (data) {
            //console.log(data)
            $("#lista").html(data);
        },
    });
}

function abrirModal(){
    $("#alm_valor").val("1");
    $("#ModalRegistrar").modal("show");
    $("#alm_nombre").focus()
}

function editar($id) {
    $.post("controlador/Clogistica.php?op=LLENAR_ALM", { id: $id }, function (data) {
        console.log(data);

        $("#alm_id").val(data.id);
        $("#alm_nombre").val(data.nombre);
        $("#alm_responsable").val(data.responsable);
        $("#alm_correo").val(data.correo);
        $sucursal.val(data.id_sucursal).trigger("change");
        $("#alm_tipo").val(data.tipo).change();
        $("#alm_valor").val("2");
        $("#ModalRegistrar").modal("show");
    }, "JSON")
}

$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();

    $.ajax({

        url: 'controlador/Clogistica.php?op=NUEVO_ALM',
        type: "POST",
        data: $(this).serialize(),

        success: function (data) {
            $('#ModalRegistrar').modal('hide');
            Listar(1);
            console.log(data);
            $('#formRegistrar').trigger("reset");
            $sucursal.val("").trigger("change");
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

function EliminarAlmacen($id) {
  swal({
    title: "Desea Eliminar Almacen ??",
    text: "Está seguro de Eliminar Almacen. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_ALM', id:$id}, function (data) {
			if (data==1) {Listar();swal("Tipo de operación Eliminada ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}

function PintarFilaAlm($id) {

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