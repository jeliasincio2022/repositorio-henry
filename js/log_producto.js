var $equipo = $("#pro_equipo").select2({ dropdownAutoWidth: true, width: '100%' });
var $categoria = $("#pro_categoria").select2({ dropdownAutoWidth: true, width: '100%' });
var $categoria_buscar = $("#pro_buscar_categoria").select2({ dropdownAutoWidth: true, width: '100%' });

var $unidad = $("#pro_unidad").select2({ dropdownAutoWidth: true, width: '100%' });

var $examen = $("#pro_examen").select2({ dropdownAutoWidth: true, width: '100%' });

var $id_producto_fraccion = $("#pro_producto_fraccion").select2({ dropdownAutoWidth: true, width: '100%' });

var $tipo = $("#pro_tipo").select2({ dropdownAutoWidth: true, width: '100%' });
ListarProductosFraccion()
Listar();
$("#tr_fraccion").hide()

function Listar() {
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_PRO&q=' + $("#buscar").val() + "&id_categoria="+$("#pro_buscar_categoria").val(),
        type: "POST",				
        success: function (data) {
            $("#lista").html(data);
        },
    });
}

function ChangeFraccionar(){
    
    if(!$("#cbx_fraccion").is(':checked')){
        $("#tr_fraccion").hide()
        $("#pro_cantidad_fraccion").val("").change()
        $("#pro_producto_fraccion").val("").change()

    }else{
        $("#tr_fraccion").show()
    }   
}

function abrirModal() {
    $("#ModalRegistrar").modal("show");
    $("#cbx_fraccion").prop("checked",false).change()

    ListarProductosFraccion()
    $("#pro_valor").val("1");
    $("#pro_nombre,#pro_examen,#pro_stock_min,#pro_stock_max,#pro_cantidad_fraccion").val("");    
    $equipo.val("").trigger("change");
    $examen.val("").trigger("change");
    $categoria.val("").trigger("change");
    $tipo.val("").trigger("change");
    $id_producto_fraccion.val("").trigger("change");
    $unidad.val("").trigger("change");
    
    $("#pro_nombre").focus()
}

function ListarProductosFraccion() {

    $.post("controlador/Clogistica.php?op=LISTAR_PRO_FRACCION", {
    }, function (data) {
        $("#pro_producto_fraccion").html(data);
       // console.log(data)
    });
}


function editar($id) {
    $("#cbx_fraccion").prop("checked",false).change()

    $.post("controlador/Clogistica.php?op=LLENAR_PRO", { id: $id }, function (data) {
        //console.log(data);

        ListarProductosFraccion()

        $("#pro_id").val(data.id);
        $("#pro_nombre").val(data.nombre);
        /*$("#pro_equipo").val(data.equipo);
        $("#pro_examen").val(data.examen);*/
        $("#pro_stock_min").val(data.stock_min);
        $("#pro_stock_max").val(data.stock_max);
        $("#pro_cantidad_fraccion").val(data.cantidad_fraccion);
        $equipo.val(data.equipo).trigger("change");
        $examen.val(data.examen).trigger("change");
        $tipo.val(data.tipo_producto).trigger("change");
        $categoria.val(data.id_categoria).trigger("change");
        $unidad.val(data.id_unidad).trigger("change");

        $("#pro_valor").val("2");


        setTimeout(function () {
            if (data.id_producto_fraccion == 0) { //SI ES O NO FRACCIONADO
                $("#cbx_fraccion").prop("checked",false).change()

            } else {
                $("#cbx_fraccion").prop("checked",true).change()

                $id_producto_fraccion.val(data.id_producto_fraccion).trigger("change");

            }
            $("#ModalRegistrar").modal("show");
        }, 300);

    }, "JSON")
}

$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();

    if ($('#pro_tipo').val() == '1' && $('#pro_producto_fraccion').val() != '') {//servicio
        swal("Servicio no puede fraccionarse ..", "", "warning");
        return false;
    }


    if ($('#pro_producto_fraccion').val() == $('#pro_id').val() && $('#pro_id').val() != '' && $("#pro_valor").val() == '2') {

        swal("Error", "Producto fracción no puede ser igual ..", "error");
        return false;
    }
    if ($('#pro_producto_fraccion').val() != '' && ($("#pro_cantidad_fraccion").val() == '' || $("#pro_cantidad_fraccion").val() == '0')) {

        swal("Ingrese una cantidad ..", "", "warning");
        return false;
    }
    if (($('#pro_producto_fraccion').val() == '' || $('#pro_producto_fraccion').val() == '0') && ($("#pro_cantidad_fraccion").val() != '' && $("#pro_cantidad_fraccion").val() != '0')) {

        swal("Seleccione un producto ..", "", "warning");
        return false;
    }
    $.ajax({
        url: 'controlador/Clogistica.php?op=NUEVO_PRO',
        type: "POST",
        data: $(this).serialize(),

        success: function (data) {
            $('#ModalRegistrar').modal('hide');
            Listar(1);
            //console.log(data);
         
            $('#formRegistrar').trigger("reset");
            $("#pro_nombre,#pro_stock_min,#pro_stock_max,#pro_cantidad_fraccion").val("");
            $equipo.val("").trigger("change");
            $examen.val("").trigger("change");
            $categoria.val("").trigger("change");
            $tipo.val("").trigger("change");
            $id_producto_fraccion.val("").trigger("change");
            $unidad.val("").trigger("change");


            if (data == 1) {

                swal("Datos registrados Correctamente ..", "Felicitaciones", "success");

                return false;
            } else
                if (data == 0) {
                    swal("Datos no registrados Correctamente ..", "Error", "error");
                    return false;
                } else if (data == 3) {
                    swal("Error", "El producto ya es fracción de otro ", "error");
                } else if (data == 4) {
                    swal("Error", "Producto fracción no puede ser igual", "error");

                } else if (data == 5) {
                    swal("Error", "Producto fracción ya fraccionado", "error");

                } else if (data == 6) {
                    swal("Error", "Producto fracción ya utilizado", "error");

                }  else if (data == 2) {
                    swal("Error", "Nombre ya utilizado", "error");

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

function EliminarProd($id) {
  swal({
    title: "Desea Eliminar Categoria ??",
    text: "Está seguro de Eliminar Categoria. ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
    if (willDelete) {
      $.get("controlador/Clogistica.php", {op:'ELIMINAR_PROD', id:$id}, function (data) {
			if (data==1) {Listar();swal("Proveedor Eliminado ..", "Felicitaciones", "success");return false; } 
		  	if(data==0){swal("Error ",'Error','error');return false;}       
      })
    }
  });
}

function ReporteExcel() {
    
    window.location = 'reporte_excel_productos.php?q=' + $("#buscar").val() + "&id_categoria="+$("#pro_buscar_categoria").val()
}
function PintarFilaProd($id) {

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