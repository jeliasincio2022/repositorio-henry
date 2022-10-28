$(document).ready(function () {

     //NroOrdCom()

    var $sucursal = $("#OCid_cmb_suc").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $categoria = $("#OCcategoria").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $buscar_sucursal = $("#OCbuscar-id_cmb_suc").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });

    var $almacen = $("#OCid_cmb_alm").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $buscar_almacen = $("#OCbuscar-id_cmb_alm").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });

    var $tipo = $("#OCtipo").select2({
        dropdownAutoWidth: true,
        width: '97%'
       
    });

    var $producto = $("#OCid_cmb_pro").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });

    var $proveedor = $("#OCid_cmb_prov").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });

    var $buscar_estado = $("#OCbuscar-estado").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });


    $("#OCid_cmb_suc").focus();

    $('.numero').on("keypress", function () {
        if (event.keyCode > 47 && event.keyCode < 60 || event.keyCode == 46) {

        } else {
            event.preventDefault();
        }
    });
});

//DEZPLAZAR POR FORMULARIO

 
$("#OCid_cmb_suc").change(function () {
    if ($("#OCid_cmb_suc").val() != "" && $("#OCvalor").val() == '2') {
        almacenxsucursal()
    }
    if ($("#OCid_cmb_suc").val() != "" && $("#OCvalor").val() == '1') {
        almacenxsucursal()
        setTimeout(function () {$("#OCid_cmb_alm").select2('open');}, 100);
    }
});

$("#OCid_cmb_alm").change(function () {
    if ($("#OCid_cmb_alm").val() != "" && $("#OCvalor").val() != '2') {
        $("#OCtipo").select2('open');
    }
});

$("#OCtipo").change(function () {
    if ($("#OCtipo").val() != "" && $("#OCvalor").val() != '2') {
        setTimeout(function () {$("#OCid_cmb_prov").select2('open');}, 100);
    }
    NroOrdCom()
    OCListarProductos()
});

$("#OCid_cmb_prov").change(function () {
    if ($("#OCid_cmb_prov").val() != "" && $("#OCvalor").val() != '2') {
        setTimeout(function (){$("#OCfecha").focus();}, 100);
    }
});

$("#OCfecha").keypress(function (e) {
    if (e.which == 13) {
        $("#OCreferencia").focus()
    }
});

$("#OCreferencia").keypress(function (e) {
    if (e.which == 13) {
		$("#OCentrega").focus()        
    }
});

$("#OCentrega").keypress(function (e) {
    if (e.which == 13) {
		$("#OCanticipo").focus()       
    }
});

$("#OCanticipo").keypress(function (e) {
    if (e.which == 13) {
		$("#OCid_cmb_pro").select2('open');       
    }
    
});

$("#OCid_cmb_pro").change(function () {

    LlenarStockUnidad()

    setTimeout(function () {$("#OCcantidad").focus();}, 1000);
});

$("#OCcantidad").keypress(function (e) {

    if (e.which == 13) {
        OCAñadirDetalle();
        $("#OCid_cmb_pro").select2('open');
    }
});
$("#OCnro").keypress(function (e) {
    if (e.which == 13) {
        $("#OCfecha").focus();
    }
});


$(document).keydown(function (e) {

    if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        OCguardar();
        setTimeout(OCcancelar, 300);
    }
});

$("#OCbuscar-id_cmb_suc").change(function () {
    setTimeout(function () {almacenxsucursal2()}, 300);
});

//BOTONES

$("#OCnro,#OCid_cmb_alm,#OCid_cmb_suc,#OCreferencia,#OCfecha,#OCtipo,#OCid_cmb_pro,#OCcategoria,#OCcantidad,#OCid_cmb_prov,#OCentrega,#OCanticipo").attr("disabled", true);
$("#OCbtn_guardar,#OCbtn_imprimir,#OCbtn_limpiar,#OCbtn_anular,#OCbtn_finalizar").attr("disabled", true);


$("#OCbtn_nuevo").click(function (){   $("#OCid_cmb_alm,#OCid_cmb_suc,#OCreferencia,#OCfecha,#OCtipo,#OCid_cmb_pro,#OCcategoria,#OCcantidad,#OCid_cmb_prov,#OCentrega,#OCanticipo").attr("disabled", false);
    NroOrdCom()
    $("#OCbtn_guardar,#OCbtn_limpiar").attr("disabled", false);
    $("#OCbtn_buscar,#OCusuario").attr("disabled", true)
});


$("#OCbtn_guardar").click(function () {
    OCguardar();
    //$("#OCbtn_cancelar").click()
});


$("#OCbtn_buscar").click(function () {
    OCListarBuscar();
    $("#OCbtn_nuevo").attr("disabled", true);
    $("#OCModal").modal();
});


$("#OCbtn_imprimir").click(function () {

    if ($("#id_OC").val() == '') {
        swal("Seleccione una orden de compra", "", "warning")
        return false;
    }
    a = document.createElement("a");
    a.href = 'reporte-orden-compra.php?id_orden=' + $("#id_OC").val();
    a.target = '_blank';
    a.click()
});
$("#OCbtn_limpiar").click(function (){ OCcancelar() });
$("#OCbtn_cancelar").click(function () {
    OCcancelar()
    $("#OCbtn_nuevo,#OCbtn_buscar").attr("disabled", false);
    $("#OCbtn_guardar,#OCbtn_imprimir,#OCbtn_limpiar,#OCbtn_finalizar,#OCbtn_anular,#OCentrega,#OCanticipo").attr("disabled", true);

});
$("#OCbtn_anular").click(function () {

    var $ident = $("#IdFilaOC").val();
    if ($ident==0){swal("Debe seleccionar un Registro", "Obligatorio", "warning");return false;}

    $.post("controlador/Clogistica.php?op=ESTADO_ORD_COM",{estado: "anulada",id: $("#id_OC").val()},function (data){
        if (data==1){swal("Correcto", "Orden anulada", "success");}else{swal("Error", "No se pudo anular la orden", "error");}
    });
});
$("#OCbtn_finalizar").click(function () {
    var $ident = $("#IdFilaOC").val();
    if ($ident==0){swal("Debe seleccionar un Registro", "Obligatorio", "warning");return false;}

    $.post("controlador/Clogistica.php?op=ESTADO_ORD_COM",{estado: "finalizada", id: $("#id_OC").val()}, function (data) {
        if (data==1){swal("Correcto", "Orden finalizada", "success");} else {swal("Error", "No se pudo finalizar la orden", "error");}
    });
});


function NroOrdCom() {   
    $.post("controlador/Clogistica.php?op=NRO_ORD_COM",{t: $("#OCtipo").val()}, function (data) {
       // console.log(data)        
        $("#OCnro").val(data);           
    });
}

//DETALLE ORDEN DE COMPRA
var orden_compra = new Array();

function OClistar() {
    $("#IdCuerpoOCD").html("");
    for (var i = 0; i < orden_compra.length; i++) {

        $("#IdCuerpoOCD").append("<tr><td width='3%' class='text-left'><a class=' text-center' onclick='OCeliminar(" + i + ")'>\n\
<icon class='fa fa-trash'> </icon></a></td><td width='3%'>" + parseInt(i + 1) + "</td>\n\
<td width='51%' style='text-align:left;'>" + orden_compra[i].nombre_producto + "</td>\n\
<td width='4%' style='text-align:left;'> " + orden_compra[i].cantidad + "</td>\n\
<td width='10%'> " + orden_compra[i].unidad + "</td><td width='10%'> " + orden_compra[i].despachado + "</td><td width='10%'> " + orden_compra[i].pendiente + "</td>\n\
<td width='10%'> <input size='6' style='text-align:right;' class='appendform-control' id='fila_"+i+"' onchange='ChangePrecio("+i+")' value='" + orden_compra[i].precio + "' ></td>");
    }
}

function OCAñadirDetalle() {

    if ($("#OCid_cmb_pro").val() == "") {
        swal("Campo requerido", "Seleccione un producto", "warning");
        setTimeout(function () {
            $("#OCid_cmb_pro").select2('open');
        }, 200);
        return false;
    }

    if ($("#OCcantidad").val() == "") {
        swal("Campo requerido", "Inserte una cantidad", "warning");
        $("#OCcantidad").focus();
        return false;
    }

    if ($("#OCunidad").val() == "") {
        swal("Campo requerido", "Inserte una unidad", "warning");
        $("#OCunidad").focus();
        return false;
    }

    var id_producto = $("#OCid_cmb_pro").val();
    var seleccionado = $("#OCid_cmb_pro").val();
    var nombre_producto = $("#OCpro_" + seleccionado).attr("nombre_producto");
    var cantidad = $("#OCcantidad").val();    
    var unidad = $("#OCunidad").val();

    for (var i = 0; i < orden_compra.length; i++) {

        if (orden_compra[i].id_producto == id_producto) {
            orden_compra[i].cantidad = parseInt(orden_compra[i].cantidad) + parseInt(cantidad);
            orden_compra[i].pendiente = parseInt(orden_compra[i].pendiente) + parseInt(cantidad);
            OClistar();

            $("#OCcantidad").val("");
            $("#OCunidad").val("");

            setTimeout(function () {
                $("#OCid_cmb_pro").val("").change();

                $("#OCid_cmb_pro").trigger('chosen:open');
            }, 300);
            return false;
        }
    }

    var detalle = {
        id_producto: id_producto,
        nombre_producto: nombre_producto,
        cantidad: cantidad,
        unidad: unidad,
        despachado: "0",
        pendiente: cantidad,
        precio:"0.00"
    };
    orden_compra.push(detalle);
    OClistar();
    $("#OCcantidad").val("");
    $("#OCunidad").val("");
    setTimeout(function () {
        $("#OCid_cmb_pro").val("").change();

        $("#OCid_cmb_pro").trigger('select:open');}, 300);
}

function OCeliminar(id) {

    orden_compra.splice(id, 1);
    OClistar();
}
function ChangePrecio(i){
    orden_compra[i].precio=$("#fila_"+i).val()
    OClistar()
    console.log(orden_compra)
}

// FUNCIONES DEL FORMULARIO

function LlenarStockUnidad() {

    $.post("controlador/Clogistica.php?op=LLENAR_PRO", {id: $("#OCid_cmb_pro").val()}, function (data) {
        $("#OCunidad").val(data.unidad)}, 'JSON');

    $("#OCstock").val("0")

    $.post("controlador/Clogistica.php?op=STOCK_PRO", {id: $("#OCid_cmb_pro").val()}, function (data) {
        $("#OCstock").val(data)
    }, 'JSON');
}
function OCListarProductos() {

    $.post("controlador/Clogistica.php?op=LISTAR_PRO_OC", {}, function (data) {
        $("#OCid_cmb_pro").html(data);
    });

}
function almacenxsucursal() {
    $("#OCid_cmb_alm").html("");
    // $('#OCid_cmb_alm').chosen('destroy');
    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {
        sucursal: $("#OCid_cmb_suc").val(),

    }, function (data) {
        //console.log(data)
        $("#OCid_cmb_alm").html(data);

    });
}


function OCguardar() {

    if (orden_compra.length==0){swal("Vacío", "Inserte datos", "warning"); return false;}
    if ($("#OCid_cmb_suc").val()==""){swal("Campo requerido", "Seleccione una sucursal", "warning");
            setTimeout(function(){$("#OCid_cmb_suc").select2('open');}, 200); return false;}
    if ($("#OCid_cmb_alm").val()==""){swal("Campo requerido", "Seleccione un almacén", "warning");
        setTimeout(function () {$("#OCid_cmb_alm").select2('open');}, 200); return false;}
    if ($("#OCtipo").val()==""){swal("Campo requerido", "Seleccione un tipo de orden", "warning");
        setTimeout(function (){$("#OCtipo").select2('open');}, 200); return false;}
    if ($("#OCnro").val()==""){swal("Campo requerido", "Inserte número", "warning"); $("#OCnro").focus();return false;}
    if ($("#OCfecha").val()==""){swal("Campo requerido", "Inserte fecha", "warning"); $("#OCfecha").focus();return false;}
	if ($("#OCentrega").val()==""){swal("Campo requerido", "Inserte plazo de entrega", "warning");$("#OCentrega").focus();
        return false;}
    if ($("#OCanticipo").val()==""){swal("Campo requerido", "Inserte anticipo", "warning");$("#OCanticipo").focus();return false;}

    $.post("controlador/Clogistica.php?op=NUEVO_ORD_COM", {
        orden_compra: JSON.stringify(orden_compra),
        fecha: $("#OCfecha").val(),
        id: $("#id_OC").val(),
        referencia: $("#OCreferencia").val(),
        nro: $("#OCnro").val(),
        almacen: $("#OCid_cmb_alm").val(),
        sucursal: $("#OCid_cmb_suc").val(),
        tipo: $("#OCtipo").val(),
        valor: $("#OCvalor").val(),
        proveedor: $("#OCid_cmb_prov").val(),
        entrega: $("#OCentrega").val(),
        anticipo: $("#OCanticipo").val()
    }, function (data) {

        console.log(data)
        swal(data, "Error", "warning");return false;
        if (data == 1) {
            swal("Correcto", "Orden registrada correctamente", "success");return false;
        } else {
            swal("Error", "Orden no registrada ", "error");return false;
        }
        $("#OCbtn_nuevo").removeAttr("disabled");
        $("#OCbtn_limpiar").removeAttr("disabled");
        $("#OCvalor").val("1")
    });
    //OCcancelar()
    $("#OCbtn_buscar").attr("disabled", false);
}

function OCcancelar() {
    orden_compra = new Array();
    $("#OCnro").val("");
	$("#OCentrega").val("");
	$("#OCanticipo").val("");
    $("#OCid_cmb_alm").val("").html("<option value=''>Seleccione</option>");

    $("#OCid_cmb_suc").val("").change();
    $("#OCid_cmb_alm").val("").change();

    $("#OCreferencia").val("");
    $("#OCfecha").val("");

    $("#OCtipo").val("").change();
    $("#OCid_cmb_pro").val("").change();
    $("#OCid_cmb_prov").val("").change();

    $("#OCcategoria").val("").change();

    $("#OCcantidad").val("");
    $("#OCunidad").val("");
    $("#OCvalor").val("1")
	
    setTimeout(function(){        $("#OCid_cmb_alm,#OCid_cmb_suc,#OCreferencia,#OCfecha,#OCtipo,#OCid_cmb_pro,#OCcategoria,#OCcantidad,#OCid_cmb_prov,#OCentrega,#OCanticipo").attr("disabled", true);
    }, 100);
    OClistar();
}

function PintarFilaOC($id) {
    var $idfilaanterior = $("#IdFilaOC").val()

    var $par = $idfilaanterior.split('_')
    var $par_int = parseInt($par[1]);
    // alert($par_int)
    $("#" + $idfilaanterior).css("background-color", "white")
    $("#" + $idfilaanterior).css("color", "black")
    if ($par_int % 2 == 0) {
        // alert("hola")
        $("#" + $idfilaanterior).css({
            //"background-color": "#f5f5f5",
            "background-color": "#FFFFFF",
            "color": "#000000"
        });
    } else {
        $("#" + $idfilaanterior).css({
            "background-color": "#FFFFFF",
            "color": "#000000"
        });
    }
    //alert($id);alert($idfilaanterior)
    /*$("#" + $id).css({
        "background-color": "darkgrey",
        "color": "#FFFFFF"
    });*/
    $("#" + $id).css("background-color", "#6FA0B9")
    $("#" + $id).css("color", "white")
    $("#IdFilaOC").val($id);

}

//FUNCIONES MODAL
function OCListarBuscar() {
    var $fecha = $("#OCbuscar-fecha").val();
    var $estado = $("#OCbuscar-estado").val();
    var $nro = $("#OCbuscar-nro_orden").val();
    var $almacen = $("#OCbuscar-id_cmb_alm").val();
    $.post('controlador/Clogistica.php?op=LIS_ORD_COM', {
        fecha: $fecha,
        estado: $estado,
        nro: $nro,
        almacen: $almacen
    },
        function (data) {
            $("#IdCuerpoOCbuscar").html(data);
            $("#IdFilaOC").val(0);
            $("#OCid_cmb_alm,#OCid_cmb_suc,#OCreferencia,#OCfecha,#OCtipo,#OCid_cmb_pro,#OCcategoria,#OCcantidad,#OCid_cmb_prov").attr("disabled", false);
        });
}
function almacenxsucursal2() {
    $("#OCbuscar-id_cmb_alm").html("");
    $.post("controlador/Clogistica.php?op=LISTAR_ALM_GRALxSUC", {
        sucursal: $("#OCbuscar-id_cmb_suc").val(),
    }, function (data) {

        $("#OCbuscar-id_cmb_alm").html(data);

    });
}
function OCLlenarDatos() {
    $("#OCbtn_guardar,#OCentrega,#OCanticipo").attr("disabled", false);
    $("#OCbtn_buscar,#OCusuario").attr("disabled", true)

    $("#OCvalor").val(2);
    var $ident = $("#IdFilaOC").val();
    var $id = $("#" + $ident).attr("idOC");
    if ($ident == 0) {
        swal("Debe seleccionar un Registro", "Obligatorio", "warning");
        return false;
    }
    $.post("controlador/Clogistica.php?op=LLENAR_ORD_COM", {

        id: $id
    }, function (data) {
        /*$.blockUI({
            css: {
                backgroundColor: 'white',
                color: 'darkslategray'
            },
            message: '<h1>Espere...</h1>'
        });
        setTimeout($.unblockUI, 1500);*/

        $("#OCvalor").val("2");
        $("#id_OC").val(data.id);
        $("#OCnro").val(data.numero);
        $("#OCfecha").val(data.fecha);
        $("#OCreferencia").val(data.referencia);
        $("#OCentrega").val(data.entrega);
        $("#OCanticipo").val(data.anticipo);
        $("#OCid_cmb_suc").val(data.id_sucursal).change();
        $("#OCid_cmb_prov").val(data.id_proveedor).change();

        setTimeout(function () {
            $("#OCid_cmb_alm").val(data.id_almacen).change();
        }, 200);
        setTimeout(function () {
            $("#OCtipo").val(data.tipo).change();
        }, 200);

        setTimeout(function () {
            $("#OCModal").modal("hide");
        }, 100);

        $.post("controlador/Clogistica.php?op=LLENAR_ORD_COM_DET", {

            id: data.id
        }, function (detalles) {
            orden_compra = new Array();

            for (var i = 0; i < detalles.length; i++) {
                orden_compra_detalle = {
                    id_producto: detalles[i].id_producto,
                    nombre_producto: detalles[i].nombre,
                    cantidad: detalles[i].cantidad,
                    unidad: detalles[i].nombre_unidad,
                    despachado: detalles[i].despachado,
                    pendiente: detalles[i].pendiente,
                    precio:detalles[i].precio != null? detalles[i].precio : '0.00'
                };
                orden_compra.push(orden_compra_detalle);
            }

            OClistar();
            $("#OCbtn_guardar,#OCbtn_imprimir,#OCbtn_anular,#OCbtn_finalizar").attr("disabled", false);
        }, 'JSON');
    }, 'JSON');
}