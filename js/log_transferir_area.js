$(document).ready(function () {

    var stock;
    var unidad;

    var $sucursal_org = $("#TAsuc_org").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });

    var $almacen_org = $("#TAalm_org").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });

    var $area = $("#TAarea").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
	
	var $personal = $("#TApersonal").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
	
    var $producto = $("#TAproducto").select2({
        dropdownAutoWidth: true,
        width: '99%'
    });

    $('.numero').on("keypress", function () {
        if (event.keyCode > 47 && event.keyCode < 60 || event.keyCode == 46) {
        } else {
            event.preventDefault();
        }
    });
});

var transferencias = Array()

$(document).on('click', '#btn_añadir', function () {
    $("#btn_añadir").attr("disabled", true)
    id_lote = $("#TAproducto").val()
    nombre_producto = $("#producto_" + id_lote).data('nombre')
    cantidad = $("#TAcantidad").val()
    stock = stock

    if (id_lote == "") {
        swal("Seleccione un producto", "", "warning")
        $("#btn_añadir").attr("disabled", false)

        return false;
    }

    if (cantidad == "" || cantidad <= 0) {
        swal("Ingrese una cantidad", "", "warning")
        $("#btn_añadir").attr("disabled", false)
        return false;
    }
    for (var i = 0; i < transferencias.length; i++) {

        if (transferencias[i].id_lote == id_lote) {
            swal("Producto ya añadido", "", "info")
            $("#btn_añadir").attr("disabled", false)
            return false;
        }
    }

    transferencias.push({
        id_lote: id_lote,
        cantidad: cantidad,
        nombre_producto: nombre_producto,
        stock: stock
    })
    listar()
    $("#btn_añadir").attr("disabled", false)

})

function listar() {
    $("#lista-productos").html("")
    transferencias.forEach(function (t, index) {
        $("#lista-productos").append("<tr><td>" + t.nombre_producto + "</td><td>" + t.cantidad + "</td><td><i data-index='" + index + "' class='borrar fa fa-trash'></i></td></tr>")
    })
    $("#TAproducto,#TAcantidad,#TAstock,#TAunidad").val("").change()
    console.log(transferencias)
}

$(document).on("click", '.borrar', function () {
    transferencias.splice($(this).data('index'), 1)
    listar()
})

$("#TAsuc_org").change(function () {
    if ($("#TAsuc_org").val() != "") {
        almacenxsucursal1()
        setTimeout(function () { $("#TAalm_org").select2('open'); }, 100);
    }
});

$("#TAarea").change(function () {
    if ($("#TAarea").val() != "") {
        personalxarea()
        setTimeout(function () { $("#TApersonal").select2('open'); }, 100);
    }
});

$("#TAalm_org").change(function () {
    if ($("#TAalm_org").val() != "") {

        setTimeout(function () {
            $("#TAsuc_des").select2('open');
        }, 100);
        setTimeout(function () {
            LotexAlmacen()
        }, 600);
    }
});

function almacenxsucursal1() {
    $("#TAalm_org").html("");
	$sucursal = $("#TAsuc_org").val()
    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {sucursal: $sucursal}, function (data) {

        $("#TAalm_org").html(data);
        // console.log(data);
    });
}

function personalxarea() {
    $("#TApersonal").html("");
	$area = $("#TAarea").val()
    $.post("controlador/Clogistica.php?op=LISTAR_PERxAREA", {area: $area}, function (data) {

        $("#TApersonal").html(data);
        // console.log(data);
    });
}

function LotexAlmacen() {
    $("#TAproducto").html("");
    $.post("controlador/Clogistica.php?op=LISTAR_LOTExALM", {almacen: $("#TAalm_org").val(),}, function (data) {

        $("#TAproducto").html(data);
        // console.log(data);

    });
}

$("#TAproducto").change(function () {
    if ($("#TAproducto").val() != "") {
        MostrarStockUnidad()
        $("#TAcantidad").focus()
    }
});


$("#TAfraccionar").change(function () {

    MostrarStockUnidad()

    // console.log(stock)
    //console.log(unidad)

});


function MostrarStockUnidad() {

    $.post("controlador/Clogistica.php?op=PRODUCTOxLOTE", { lote: $("#TAproducto").val(), }, function (data) {

        stock = data.stock

        $("#TAstock").val(stock);
        $("#TAunidad").val(data.nombre_unidad);
    }, 'JSON');
}

$("#TAcantidad").change(function () {
    if ($("#TAcantidad").val() > parseInt(stock)) {
        swal("Cantidad excede el stock", "", "error")
        $("#TAcantidad").val("")
        $("#TAcantidad").focus();
        return false;
    }
});


function Transferir() {

    if ($("#TAalm_org").val() == "") {
        swal("Campo requerido", "Seleccione un almacén de origen", "warning");
        setTimeout(function () {
            $("#TAalm_org").select2('open');
        }, 200);
        return false;
    }

    if ($("#TAarea").val() == "") {
        swal("Campo requerido", "Seleccione un área de destino", "warning");
        setTimeout(function () {
            $("#TAarea").select2('open');
        }, 200);
        return false;
    }
    if ($("#TAfecha").val() == "") {
        swal("Campo requerido", "Seleccione una fecha", "warning");
      
        return false;
    }
    if (transferencias.length == 0) {
        swal("Añada productos a la lista", " ", "warning");
        return false;
    }
	$fecha=$("#TAfecha").val()
  //alert($fecha);exit;
    	$.post("controlador/Clogistica.php?op=TRANSFERIR_AREA", {
		almacen_origen: $("#TAalm_org").val(),
        area: $("#TAarea").val(),
        fecha: $fecha,
        transferencias: JSON.stringify(transferencias)

    }, function (data) {

        if (data == 1) {
            swal("Correcto", "Orden registrada correctamente", "success");
        } else {
            swal("Error", "Orden no registrada ", "error");
        }
        $("#TAalm_org").html("<option value=''>Seleccione</option>");
        $("#TAsuc_org,#TAsuc_des,#TAalm_org,#TAarea,#TAproducto,#TAcantidad,#TAstock,#TAunidad").val("").change()
        stock = ''
        unidad = ''
        transferencias = Array()
        listar()
        console.log(data);
    });
}