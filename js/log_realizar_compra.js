$(document).ready(function () {
    
    $("#afecto").focus();
    $("#td-nro_dias").hide();
    ListarAlmacenesGral()
    var $producto_select2 = $("#id_cmb_pro").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $proveedor_select2 = $("#id_cmb_prov").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $almacen_select2 = $("#id_cmb_alm").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $sucursal_select2 = $("#id_cmb_suc").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $tipo_documento_select2 = $("#tipo_documento").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $tipo_compra_select2 = $("#tipo_compra").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });
    var $bonificacion_select2 = $("#bonificacion").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });



    $('.numero').on("keypress", function () {
        if (event.keyCode > 47 && event.keyCode < 60 || event.keyCode == 46) {

        } else {
            event.preventDefault();
        }

    });

    $('.entero').on("keypress", function () {
        if (event.keyCode > 47 && event.keyCode < 58) {

        } else {
            event.preventDefault();
        }

    });
    $("#monto_igv_total").val("0.00");
    $("#monto_sin_igv").val("0.00");
    $("#total").val("0.00");
    $("#igv").val("0.00");
    var IGV;
    ObtenerIGV()
    $('#inafecto,#sin_redondeo').prop("checked", true)
    $('#igv_detalle').prop("disabled", true)

});

function ObtenerIGV() {
    $.post("controlador/Clogistica.php?op=IGV", { }, function (data) {
        IGV = data;
    });
}


//COMPRA

function llenarIGV() {
    if ($('input:radio[name=tipo_afectacion]:checked').val() == "1") {
        $("#igv").val(IGV * 100);
        $("#igv_detalle").prop("disabled", false);

    };
    if ($('input:radio[name=tipo_afectacion]:checked').val() == "2") {
        $("#igv").val("0.00");
        $("#igv_detalle").prop("checked", false);
        $("#igv_detalle").prop("disabled", true);
    };

    listar()

}

$("#redondeo").change(function () {

    $("#valor-redondeo").html($(this).val())
    listar()
})


function guardar() {

    if (compra.length == 0) {
        swal("Vacío", "Inserte datos", "warning");
        return false;
    }
    if ($("#id_cmb_prov").val() == "") {
        swal("Campo requerido", "Seleccione un proveedor", "warning");
        $("#id_cmb_prov").focus();
        return false;
    }
    if ($("#d_cmb_alm").val() == "") {
        swal("Campo requerido", "Seleccione un almacen", "warning");
        $("#d_cmb_alm").focus();
        return false;
    }
    if ($("#tipo_documento").val() == "") {
        swal("Campo requerido", "Seleccione un tipo de documento", "warning");
        $("#tipo_documento").focus();
        return false;
    }
    if ($("#serie").val() == "") {
        swal("Campo requerido", "Inserte serie del documento", "warning");
        $("#serie").focus();
        return false;
    }
    if ($("#nro_documento").val() == "") {
        swal("Campo requerido", "Inserte número de documento", "warning");
        $("#nro_documento").focus();
        return false;
    }
    if ($("#fecha").val() == "") {
        swal("Campo requerido", "Inserte fecha", "warning");
        $("#fecha").focus();
        return false;
    }
    if ($("#tipo_compra").val() == "Contado") {

        $("#nro_dias").val("0")

    } else {
        if ($("#nro_dias").val() == "") {
            swal("Campo requerido", "Inserte número de dias", "warning");
            $("#nro_dias").focus();
            return false;
        }
    }


    //Validacion de precios y cantidades antes de guardar

    for (var i = 0; i < compra.length; i++) {

        if ((compra[i].fecha_vencimiento) == "") {
            swal("Ingrese fecha de vencimiento", compra[i].nombre_producto, "warning")
            return false
        }
        if ((compra[i].nro_lote) == "") {
            swal("Ingrese número de lote", compra[i].nombre_producto, "warning")
            return false
        }
        if (parseInt(compra[i].cantidad) <= 0) {
            swal("Ingrese cantidad", compra[i].nombre_producto, "warning")
            return false
        }


        if (!$.isNumeric(compra[i].cantidad)) {
            swal("Ingrese cantidad", compra[i].nombre_producto, "warning")
            return false
        }

        if (parseFloat(compra[i].precio) <= 0) {
            swal("Ingrese precio", compra[i].nombre_producto, "warning")
            return false
        }

        if (!$.isNumeric(compra[i].precio)) {
            swal("Ingrese precio", compra[i].nombre_producto, "warning")
            return false
        }
    }

    //comprobacion del total de la orden
    for (var i = 0; i < compra.length; i++) {

        if (compra[i].orden == '1') {
            cantidad_total = 0;

            for (var j = 0; j < compra.length; j++) {
                if (compra[j].id_producto == compra[i].id_producto) {
                    cantidad_total += parseInt(compra[j].cantidad)
                }
            }

            if (parseInt(cantidad_total) > parseInt(compra[i].cantidad_orden)) {

                swal("Cantidad execede a la orden", compra[i].nombre_producto, "error")
                return false;
            }
        }
    }

    $("#btn_guardar").attr("disabled", true);
    if ($("#igv_detalle").prop("checked")) {
        igv_detalle = 1
    } else {
        igv_detalle = 0
    }

    $.post("controlador/Clogistica.php?op=NUEVO_COM", {


        compra: JSON.stringify(compra),
        proveedor: $("#id_cmb_prov").val(),
        fecha: $("#fecha").val(),
        tipo_documento: $("#tipo_documento").val(),
        serie: $("#serie").val(),
        nro_documento: $("#nro_documento").val(),
        tipo_afectacion: $("input:radio[name=tipo_afectacion]:checked").val(),
        nota_credito: "0",
        tipo_compra: $("#tipo_compra").val(),
        nro_dias: $("#nro_dias").val(),
        id_orden: $("#orden").val(),
        redondeo: $("#redondeo").val(),
        id_almacen: $("#id_cmb_alm").val(),
        igv_detalle: igv_detalle

    }, function (data) {
        console.log(data);
        if (data.indexOf("OK") > -1) {
            swal("Correcto", "Compra registrada correctamente", "success");
        } else {
            swal("Error", "Compra no registrada ", "error");
        }
        $("#btn_guardar").attr("disabled", false);

        cancelar();

    });
}


function cancelar() {
    compra = new Array();
    $("#monto_igv_total").val("0.00");
    $("#monto_sin_igv").val("0.00");
    $("#total").val("0.00");
    $("#igv").val("0.00");
    $("#serie").val("");
    $("#nro_documento").val("");
    $("#id_cmb_prov").val("").change();
    $("#nro_dias").val("");
    $("#nro_lote").val("");
    $("#cantidad").val("");
    $("#precio_anterior").val("");
    $("#fecha").val("");
    $("#orden").val("");
    $("#fecha_vencimiento").val("");
    $("#id_cmb_suc").val("").change();
    $("#id_cmb_alm").html("<option value=''>Seleccione </option>");
    $("#id_cmb_alm").val("").change();
    $("#tipo_documento").val("").change();
    $("#tipo_compra").val("").change();
    $("#id_cmb_suc").prop("disabled", false);
    $("#id_cmb_alm").prop("disabled", false);
    listar();
}


//DETALLE_COMPRA
var compra = new Array();

function listar() {
    $("#IdCuerpoCD").html("");

    var stotal = 0;
    for (var i = 0; i < compra.length; i++) {
        if (compra[i].bonificacion == '0') {
            bonificacion = "<input id='" + i + "_bonificacion' type='checkbox' onchange='ModificarDetalleBonificacion(" + i + ")' >";
        } else {
            bonificacion = "<input id='" + i + "_bonificacion' type='checkbox' checked  onchange='ModificarDetalleBonificacion(" + i + ")'>";
        }

        if (compra[i].orden == '0') {
            orden = "<input  type='checkbox' disabled >";
        } else {
            orden = "<input  type='checkbox' checked  disabled>";
        }
        if (compra[i].dividir) {
            dividir = "<span class='text-left' onclick=\"Dividir(" + i + "," + compra[i].cantidad_orden + "," + compra[i].id_producto + ",'" + compra[i].nombre_producto + "','" + compra[i].tipo_producto + "')\"><icon class='fa fa-plus'></icon></span>";
        } else {
            dividir = "<span class='text-left' > </span>";
        }

        //Calculo del IGV
        if ($("#igv_detalle").prop("checked")) {
            compra[i].monto_igv = (compra[i].precio * IGV / (1 + parseFloat(IGV))).toFixed(2);
            compra[i].precio_sin_igv = (compra[i].precio - compra[i].monto_igv).toFixed(2);
            compra[i].subtotal = ((parseFloat(compra[i].precio) * compra[i].cantidad)).toFixed(2);
            $("#th-subtotal").html("Subtotal con igv")
        } else {
            compra[i].monto_igv = (compra[i].precio * IGV).toFixed(2);
            compra[i].precio_sin_igv = (compra[i].precio * 1).toFixed(2);
            compra[i].subtotal = ((parseFloat(compra[i].precio) * compra[i].cantidad)).toFixed(2);
            $("#th-subtotal").html("Subtotal sin igv")

        }

        if (compra[i].bonificacion == '0') {
            stotal += parseFloat(compra[i].subtotal);
        } else {
            compra[i].subtotal = "0.00"
        }

        if (compra[i].tipo_producto == '0') {
            nro_lote_input = "<input style='width:100%'  class='form-control' onchange=\"ModificarDetalleLote(" + i + ")\" id='" + i + "_lote'  value='" + compra[i].nro_lote + "'>"
        } else {
            nro_lote_input = ""
        }


        $("#IdCuerpoCD").append("<tr><td width='3%' class='text-left'><span class=' text-left' onclick='eliminar(" + i + ")'><icon class='fa fa-trash'></icon></span></td>\n\
                <td width='3%' class='text-left'>" + dividir + "</td>\n\
                <td width='3%'  style='text-align:left;'>" + orden + "</td>\n\
            <td width='3%'>" + parseInt(i + 1) + "</td>\n\
            <td width='18%' style='text-align:left;'>" + compra[i].nombre_producto + "</td>\n\
            <td width='10%' style='text-align:left;'><input type='date' style='width:100%' class='form-control' onchange=\"ModificarDetalleVencimiento(" + i + ")\" id='" + i + "_fecha_vencimiento' value='" + compra[i].fecha_vencimiento + "'> </td>\n\
            <td width='8%' style='text-align:left;'> " + nro_lote_input + "</td>\n\
            <td width='8%' align='center'> " + compra[i].cantidad_orden + "</td>\n\
            <td width='8%' align='center'> <input '  type='number'  style='width:100%' class='form-control text-right entero'  onchange=\"ModificarDetalleCantidad(" + i + ")\" id='" + i + "_cantidad'  value='" + compra[i].cantidad + "'></td>\n\
            <td width='8%' align='center'> <input type='number' style='width:100%' class='form-control text-right' onchange=\"ModificarDetallePrecio(" + i + ")\" id='" + i + "_precio'  value='" + compra[i].precio + "'></td>\n\
            <td width='12%' align='right'>S/. " + compra[i].precio_sin_igv + "</td>\n\
            <td width='12%' align='right'>S/. " + compra[i].subtotal + "</td>\n\
            <td width='3%'> " + bonificacion + "</td></tr>");
    }



    //CALCULO TOTAL

    if ($("#igv_detalle").prop("checked")) {
        igv_detalle = 1
    } else {
        igv_detalle = 0
    }

    $.post("controlador/Clogistica.php?op=TOTAL_COM", {

        compra: JSON.stringify(compra),
        tipo_afectacion: $("input:radio[name=tipo_afectacion]:checked").val(),
        redondeo: $("#redondeo").val(),
        igv_detalle: igv_detalle
    },
        function (data) {
            console.log(data);
            if ($('input:radio[name=tipo_afectacion]:checked').val() == "1" && $("#igv_detalle").prop("checked")) {
                $("#monto_sin_igv").val((data.monto_sin_igv).toFixed(2))
                $("#inafecta").val("0.00")


            }

            if ($('input:radio[name=tipo_afectacion]:checked').val() == "1" && !$("#igv_detalle").prop("checked")) {
                $("#monto_sin_igv").val((data.monto_sin_igv).toFixed(2))
                $("#inafecta").val("0.00")


            }

            if ($('input:radio[name=tipo_afectacion]:checked').val() == "2") {
                $("#monto_sin_igv").val("0.00")
                $("#inafecta").val((data.monto_sin_igv).toFixed(2))


            }
            $("#monto_igv_total").val((data.monto_igv).toFixed(2))
            $("#total").val((data.total).toFixed(2))


        }, 'JSON');




    /*if ($('input:radio[name=tipo_afectacion]:checked').val() == "1" && $("#igv_detalle").prop("checked")) {

        total = stotal
        $("#total").val((parseFloat(stotal)+ parseFloat($("#redondeo").val())).toFixed(2));

        monto_igv_total = (total * IGV / (1 + parseFloat(IGV)))
        monto_sin_igv = total - monto_igv_total
        $("#monto_sin_igv").val(monto_sin_igv).toFixed(2)
        $("#inafecta").val("0.00")
        $("#monto_igv_total").val((monto_igv_total).toFixed(2));
        
    }

    if ($('input:radio[name=tipo_afectacion]:checked').val() == "1" && !$("#igv_detalle").prop("checked")) {

        monto_sin_igv =stotal;

        $("#monto_sin_igv").val((parseFloat(stotal).toFixed(2)))

        monto_igv_total = monto_sin_igv * IGV
        $("#monto_igv_total").val(monto_igv_total).toFixed(2);

        total = parseFloat(monto_sin_igv) + parseFloat(monto_igv_total)
        $("#total").val((parseFloat(total)+ parseFloat($("#redondeo").val())).toFixed(2));


        $("#inafecta").val("0.00")

    }
    if ($('input:radio[name=tipo_afectacion]:checked').val() == "2") {

        monto_sin_igv =(parseFloat(stotal)+ parseFloat($("#redondeo").val())).toFixed(2)
        $("#inafecta").val(monto_sin_igv)

        
        total = parseFloat(monto_sin_igv)
        $("#monto_igv_total").val('0.00');

        $("#total").val(total.toFixed(2));

        $("#monto_sin_igv").val("0.00")

    }*/


}


function SoloEnteros(id) {
    if (event.keyCode > 47 && event.keyCode < 60 || event.keyCode == 46) {

    } else {
        event.preventDefault();
    }
}

function ModificarDetalleBonificacion($fila) {
    if ($("#" + $fila + "_bonificacion").prop("checked")) {
        compra[$fila].bonificacion = '1'
    } else {
        compra[$fila].bonificacion = '0'
    }
    listar()

}

function ModificarDetalleVencimiento($fila) {

    compra[$fila].fecha_vencimiento = $("#" + $fila + "_fecha_vencimiento").val()

    listar()


}

function ModificarDetalleLote($fila) {
    for (var i = 0; i < compra.length; i++) {

        if (compra[i].nro_lote == $("#" + $fila + "_lote").val() && compra[i].id_producto == compra[$fila].id_producto) {
            $("#" + $fila + "_lote").val("")
            swal("Lote " + compra[i].nro_lote + " ya ingresado", compra[i].nombre_producto, "info")

            return false;
        }
    }

    compra[$fila].nro_lote = $("#" + $fila + "_lote").val()
    listar()


}

function ModificarDetallePrecio($fila) {
    compra[$fila].precio = $("#" + $fila + "_precio").val()
    listar()
}

function ModificarDetalleCantidad($fila) {

    compra[$fila].cantidad = $("#" + $fila + "_cantidad").val()

    //Cantidad total del producto no exceda la orden
    cantidad_total = 0;
    for (var i = 0; i < compra.length; i++) {
        if (compra[i].id_producto == compra[$fila].id_producto && compra[$fila].orden == '1') {
            cantidad_total += parseInt(compra[i].cantidad)
        }
    }

    if (parseInt(cantidad_total) > parseInt(compra[$fila].cantidad_orden)) {
        compra[$fila].cantidad = 0;
        swal("Cantidad execede a la orden", "", "error")
    }

    listar()

}

function Dividir(fila, cantidad_orden, id_producto, nombre_producto, tipo_producto) {
    $("#dividir-btn_añadir").attr("disabled", false)
    $("#ECModalDividir").modal()
    $("#dividir-producto").html(nombre_producto)
    $("#dividir-id_producto").val(id_producto)
    $("#dividir-nombre_producto").val(nombre_producto)
    $("#dividir-tipo_producto").val(tipo_producto)
    $("#dividir-cantidad_orden").val(cantidad_orden)
    $("#dividir-fila").val(fila)

    dividir = new Array()
    DividirListar()

}

function AñadirDetalle() {

    if ($("#id_cmb_pro").val() == "") {
        swal("Campo requerido", "Seleccione un producto", "warning");
        $("#id_cmb_pro").focus();
        return false;
    }
    if ($("#precio").val() == "") {
        swal("Campo requerido", "Inserte un precio", "warning");
        $("#precio").focus();
        return false;
    }
    if ($("#cantidad").val() == "") {
        swal("Campo requerido", "Inserte una cantidad", "warning");
        $("#cantidad").focus();
        return false;
    }

    if ($("#fecha_vencimiento").val() == "") {
        swal("Campo requerido", "Inserte una fecha", "warning");
        $("#fecha_vencimiento").focus();
        return false;
    }

    if ($("#nro_lote").val() == "") {
        swal("Campo requerido", "Inserte unvlote", "warning");
        $("#nro_lote").focus();
        return false;
    }

    if ($("#bonificacion").val() == "") {
        swal("Campo requerido", "Seleccione bonificación", "warning");
        $("#bonificacion").focus();
        return false;
    }

    var id_producto = $("#id_cmb_pro").val();
    var seleccionado = $("#id_cmb_pro").val();
    var nombre_producto = $("#pro_" + seleccionado).attr("nombre_producto");
    var tipo_producto = $("#pro_" + seleccionado).attr("tipo_producto");
    var cantidad = $("#cantidad").val();
    var precio = Math.round(parseFloat($("#precio").val()) * 100) / 100;
    var fecha_vencimiento = $("#fecha_vencimiento").val();
    var nro_lote = $("#nro_lote").val();
    var precio_anterior = $("#precio_anterior").val();
    var bonificacion = $("#bonificacion").val();
    precio_sin_igv = "";
    monto_igv = "";
    subtotal = "";

    for (var i = 0; i < compra.length; i++) {

        if (compra[i].id_producto == id_producto) {
            /*compra[i].cantidad = parseInt(compra[i].cantidad) + parseInt(cantidad);*/
            swal("Producto ya añadido", "", "info")

            return false;
        }
    }

    var detalle = {
        id_producto: id_producto,
        nombre_producto: nombre_producto,
        tipo_producto: tipo_producto,
        dividir: false,
        orden: '0',
        cantidad_orden: "-",
        cantidad: cantidad,
        precio: precio,
        precio_sin_igv: precio_sin_igv,
        monto_igv: monto_igv,
        subtotal: subtotal,
        fecha_vencimiento: fecha_vencimiento,
        bonificacion: bonificacion,
        precio_anterior: precio_anterior,
        nro_lote: nro_lote
    };
    compra.push(detalle);
    listar();
    //
    $("#nro_lote").val("");
    $("#cantidad").val("");
    $("#precio").val("");
    //        $("#precio_anterior").val("0.00");
    $("#fecha_vencimiento").val("");
    setTimeout(function () {
        $("#bonificacion").val("").change();
    }, 200);
    setTimeout(function () {
        $("#id_cmb_pro").val("").change();
    }, 200);
    setTimeout(function () {
        $("#id_cmb_pro").select2('open');
    }, 200);
}

function eliminar(id) {
    // if (compra[id].orden == "0") {
    compra.splice(id, 1);
    listar();
    //} else {
    //  swal("No se puede eliminar registro de orden", "", "error")
    //   }

}


//DIVIDIR PRODUCTO
dividir = new Array()

function DividirAñadirDetalle() {
    if ($("#dividir-precio").val() == "") {
        swal("Campo requerido", "Inserte un precio", "warning");
        $("#dividir-precio").focus();
        return false;
    }
    if ($("#dividir-cantidad").val() == "") {
        swal("Campo requerido", "Inserte una cantidad", "warning");
        $("#dividir-cantidad").focus();
        return false;
    }
    if ($("#dividir-fecha_vencimiento").val() == "") {
        swal("Campo requerido", "Inserte una fecha", "warning");
        $("#dividir-fecha_vencimiento").focus();
        return false;
    }

    if ($("#dividir-bonificacion").val() == "") {
        swal("Campo requerido", "Seleccione bonificación", "warning");
        $("#dividir-bonificacion").focus();
        return false;
    }

    var id_producto = $("#dividir-id_producto").val();
    var nombre_producto = $("#dividir-nombre_producto").val();
    var tipo_producto = $("#dividir-tipo_producto").val();
    var cantidad = $("#dividir-cantidad").val();
    var cantidad_orden = $("#dividir-cantidad_orden").val();
    var precio = Math.round(parseFloat($("#dividir-precio").val()) * 100) / 100;
    var fecha_vencimiento = $("#dividir-fecha_vencimiento").val();
    var nro_lote = $("#dividir-nro_lote").val();
    var precio_anterior = $("#dividir-precio_anterior").val();
    var bonificacion = $("#dividir-bonificacion").val();
    precio_sin_igv = "";
    monto_igv = "";
    subtotal = "";

    //comprobacion del total de la orden
    cantidad_total = 0;

    for (var i = 0; i < dividir.length; i++) {

        cantidad_total += parseInt(dividir[i].cantidad)


    }

    if (parseInt(cantidad_total) + parseInt(cantidad) > parseInt(cantidad_orden)) {

        swal("Cantidad execede a la orden", "", "error")
        return false;
    }


    //igual lote solo aumenta la cantidad
    for (var i = 0; i < dividir.length; i++) {

        if (dividir[i].nro_lote == nro_lote) {
            dividir[i].cantidad = parseInt(dividir[i].cantidad) + parseInt(cantidad);
            DividirListar();


            return false;
        }
    }
    var detalle = {
        id_producto: id_producto,
        nombre_producto: nombre_producto,
        tipo_producto: tipo_producto,
        orden: '1',
        dividir: false,
        cantidad_orden: cantidad_orden,
        cantidad: cantidad,
        precio: precio,
        precio_sin_igv: precio_sin_igv,
        monto_igv: monto_igv,
        subtotal: subtotal,
        fecha_vencimiento: fecha_vencimiento,
        bonificacion: bonificacion,
        precio_anterior: precio_anterior,
        nro_lote: nro_lote
    };
    dividir.push(detalle);
    $("#dividir-cantidad").val("");
    $("#dividir-precio").val("")
    $("#dividir-fecha_vencimiento").val("")
    $("#dividir-nro_lote").val("")
    $("#dividir-unidad").val("");
    $("#dividir-bonificacion").val("")


    DividirListar();


}

function DividirListar() {
    $("#IdCuerpoCD-dividir").html("");

    for (var i = 0; i < dividir.length; i++) {
        if (dividir[i].bonificacion == '0') {
            dividir_bonificacion = "<input type='checkbox' disabled >";
        } else {
            dividir_bonificacion = "<input type='checkbox' checked  disabled >";
        }
        if (dividir[i].orden == '0') {
            orden = "<input type='checkbox' disabled >";
        } else {
            orden = "<input type='checkbox' checked  disabled>";
        }



        //Calculo del IGV
        //.toFixed(2) RECORTA A DOS DECIMALES SIN REDONDEAR INCLUIDO ENTEROS .00
        if ($("#igv_detalle").prop("checked")) {
            dividir[i].monto_igv = (dividir[i].precio * IGV / (1 + parseFloat(IGV))).toFixed(2);

            dividir[i].precio_sin_igv = (dividir[i].precio - dividir[i].monto_igv).toFixed(2);
            dividir[i].subtotal = ((parseFloat(dividir[i].precio) * dividir[i].cantidad)).toFixed(2);

        } else {
            dividir[i].precio_sin_igv = (dividir[i].precio * 1).toFixed(2);
            dividir[i].monto_igv = (dividir[i].precio * IGV).toFixed(2);
            dividir[i].subtotal = ((parseFloat(dividir[i].precio) * dividir[i].cantidad)).toFixed(2);

        }



        $("#IdCuerpoCD-dividir").append("<tr><td width='3%' class='text-left'><span class=' text-left' onclick='DividirEliminar(" + i + ")'><icon class='fa fa-trash'></icon></span></td>\n\
                <td width='3%'  style='text-align:left;'>" + orden + "</td>\n\
            <td width='3%'>" + parseInt(i + 1) + "</td>\n\
            <td width='10%' style='text-align:left;'>" + dividir[i].nombre_producto + "</td>\n\
            <td width='10%' style='text-align:left;'>" + dividir[i].fecha_vencimiento + " </td>\n\
            <td width='10%' style='text-align:left;'> " + dividir[i].nro_lote + "</td>\n\
            <td width='8%'> " + dividir[i].cantidad_orden + "</td>\n\
            <td width='10%'>" + dividir[i].cantidad + "</td>\n\
            <td width='10%'>" + dividir[i].precio + "</td>\n\
            <td width='10%'>S/. " + dividir[i].precio_sin_igv + "</td>\n\
            <td width='10%'>S/. " + dividir[i].monto_igv + "</td>\n\
            <td width='10%'>S/. " + dividir[i].subtotal + "</td>\n\
            <td width='3%'> " + dividir_bonificacion + "</td></tr>");
        //console.log(dividir[i]);
    }


}

function DividirEliminar(id) {
    dividir.splice(id, 1);
    DividirListar();
}

function DividirAñadirACompra() {
    compra.splice($("#dividir-fila").val(), 1);
    $("#dividir-btn_añadir").attr("disabled", true)
    for (var i = 0; i < dividir.length; i++) {
        compra.push(dividir[i])
    }

    $("#dividir-fila").val("")
    listar()
    $("#ECModalDividir").modal("hide")

}


function DividirComprobarCantidad(fila, nro_lote) {
    cantidad = 0;

    for (var i = 0; i < dividir.length; i++) {
        if (dividir[i].lote == lote) {
            cantidad = cantidad + dividir[i].cantidad

        }

    }

    if (cantidad > $("#dividir-cantidad_orden")) {
        dividir[fila].cantidad = "0"
        swal("Cantidad execede a la orden", "", "error")
        return true;
    } else {
        return false;
    }

}
//ORDEN_COMPRA
function AbrirModalOrdenCompra() {
    ECBuscarOrden();
    $("#ECModalOrdenCompra").modal();
}

function ECLlenarOrdenDetalle($id) {
    var $id_orden = $("#" + $id).attr("idECOC");

    $.post("controlador/Clogistica.php?op=LLENAR_ORD_COM_DET", {

        id: $id_orden
    },
        function (detalles) {
            //console.log(detalles);
            $("#IdCuerpoECbuscardetalle").html("");
            for (var i = 0; i < detalles.length; i++) {

                $("#IdCuerpoECbuscardetalle").append("<tr><td>" + parseInt(i + 1) + "</td><td>" + detalles[i].nombre + "</td><td>" +
                    detalles[i].cantidad + "</td><td>" + detalles[i].nombre_unidad + "</td><td>" +
                    detalles[i].despachado + "</td><td>" + detalles[i].pendiente + "</td><td>" + detalles[i].precio +"</tr>");

            }

        }, 'JSON');
}

function ECBuscarOrden() {
    $("#IdCuerpoECbuscardetalle").html("");
    var $nro = $("#ECbuscar-nro_orden").val();
    $.post('controlador/Clogistica.php?op=LIS_ORD_COMxnro', {

        nro: $nro
    },
        function (data) {
            $("#IdCuerpoECbuscar").html(data);
            $("#IdFilaEC").val(0);
            // $("#ECbuscar-nro_orden").val("");
        });
}

$("#ECbuscar-nro_orden").keypress(function (e) {
    if (e.which == 13) {
        ECBuscarOrden();
    }

});


function PintarFilaECOC($id) {
    var $idfilaanterior = $("#IdFilaECOC").val()

    var $par = $idfilaanterior.split('_')
    var $par_int = parseInt($par[1]);
    // alert($par_int)
    $("#" + $idfilaanterior).css("background-color", "white")
    $("#" + $idfilaanterior).css("color", "black")

    $("#" + $id).css("background-color", "#6FA0B9")
    $("#" + $id).css("color", "white")

    $("#IdFilaECOC").val($id);
    ECLlenarOrdenDetalle($id);
}

function ListarAlmacenesGral() {
    $.post("controlador/Clogistica.php?op=LISTAR_ALM_GRAL", function (data) {

        $("#id_cmb_alm").html(data)

    })
}

function SeleccionarAlmacenxOrden_Compra(id_orden) {
    $.post("controlador/Clogistica.php?op=ALMxORD_COMPRA", { id_orden: id_orden }, function (data) {

        $("#id_cmb_alm").val(data).change();


    })
}


function LlenarDatos() {

    var $ident = $("#IdFilaECOC").val();
    var $id = $("#" + $ident).attr("idECOC");
    if ($ident == 0) {
        swal("Debe seleccionar un Registro", "Obligatorio", "warning");
        return false;
    }

    ListarAlmacenesGral()

    $.post("controlador/Clogistica.php?op=LLENAR_ORD_COM_DET", {
        id: $id
    }, function (detalles) {
        //console.log(detalles)

        compra = new Array();
        $("#orden").val($id)

        SeleccionarAlmacenxOrden_Compra($id)
        $("#id_cmb_suc").attr("disabled", true)
        $("#id_cmb_alm").attr("disabled", true)


        orden_detalles = Array()
        for (var i = 0; i < detalles.length; i++) {
            compra_detalle = {
                id_producto: detalles[i].id_producto,
                nombre_producto: detalles[i].nombre,
                tipo_producto: detalles[i].tipo_producto,
                dividir: true,
                orden: "1",
                cantidad_orden: detalles[i].pendiente,
                cantidad: "0",
                unidad: detalles[i].nombre_unidad,
                precio: detalles[i].precio,
                precio_sin_igv: "0",
                monto_igv: "0",
                subtotal: "0",
                fecha_vencimiento: "",
                bonificacion: "0",
                precio_anterior: "0",
                nro_lote: ""

            };
            if (detalles[i].pendiente > 0) {
                compra.push(compra_detalle);
                listar();
                $("#ECModalOrdenCompra").modal('hide');
            } else {
                swal("Orden sin pendientes", "seleccione otro registro", "warning");
            }

        }


    }, 'JSON');



}

//DESPLAZAMIENTO FORMULARIO

function ClickAfecto() {
    setTimeout(function () {$("#id_cmb_prov").select2('open');}, 200);
}

function ClickInafecto() {
    setTimeout(function () {$("#id_cmb_prov").select2('open');}, 200);
}

function ChangeProv() {
    if ($("#id_cmb_prov").val() != "" && !$("#id_cmb_suc").attr("disabled")) {
        setTimeout(function () {$("#id_cmb_suc").select2('open');}, 200);
    }
}

function ChangeSucursal() {
    
    if ($("#id_cmb_suc").val() != "" && !$("#id_cmb_alm").attr("disabled")) {
        $("#id_cmb_alm").html("");

        $.post("controlador/Clogistica.php?op=LISTAR_ALM_GRALxSUC", { sucursal: $("#id_cmb_suc").val(), }, function (data) {
            $("#id_cmb_alm").html(data);
            
            setTimeout(function () {$("#id_cmb_alm").select2('open');}, 200);
        });
    }
}
function ChangeAlmacen() {
    if ($("#id_cmb_alm").val() != "" && !$("#id_cmb_alm").prop("disabled")) {
        $("#tipo_documento").select2('open');
    }
}


function ChangeTipoDoc() {
    if ($("#tipo_documento").val() != "") {
        setTimeout(function () {
            $("#serie").focus();
        }, 200);
    }
}
$("#serie").keypress(function (e) {
    if (e.which == 13) {
        setTimeout(function () {
            $("#nro_documento").focus();
        }, 200);
    }
});

$("#nro_documento").keypress(function (e) {
    if (e.which == 13) {
        $("#fecha").focus();
    }
});

$("#fecha").keypress(function (e) {

    if (e.which == 13) {
        setTimeout(function () {
            $("#tipo_compra").select2('open');
        }, 200);
    }

});

function ChangeTipoCompra() {
    if ($("#tipo_compra").val() != "") {
        if ($("#tipo_compra").val() == 'Contado') {
            $("#td-nro_dias").hide();
            $("#igv_detalle").focus();
            setTimeout(function () {
                $("#id_cmb_pro").select2('open');
            }, 200);
        } else {
            $("#td-nro_dias").show();
            setTimeout(function () {
                $("#nro_dias").focus();
            }, 200);
        }

    }

}

$("#nro_dias").keypress(function (e) {
    if (e.which == 13) {

        setTimeout(function () {
            $("#id_cmb_pro").select2('open');
        }, 200);
    }
})

function ClickIGV() {
    setTimeout(function () {
        $("#id_cmb_pro").select2('open');
    }, 200);
}

function ChangeProducto() {
    if ($("#id_cmb_pro").val() != '') {
        $.post("controlador/Clogistica.php?op=PRECIO_COMPRA_ULTIMO", {

            id: $("#id_cmb_pro").val()
        }, function (data) {
            if (!data) {
                $("#precio_anterior").val("0.00");
            } else {
                $("#precio_anterior").val(data);
            }

            //console.log(data);
        }, "JSON").fail(function () {
            $("#precio_anterior").val("0.00");
        });

        setTimeout(function () {
            $("#precio").focus()
        }, 200);
    }


}



$("#precio").keypress(function (e) {
    if (e.which == 13) {
        $("#cantidad").focus();
    }
})
$("#cantidad").keypress(function (e) {
    if (e.which == 13) {
        $("#fecha_vencimiento").focus();
    }
})


$("#fecha_vencimiento").keypress(function (e) {

    if (e.which == 13) {

        $("#nro_lote").focus();

    }

});
$("#nro_lote").keypress(function (e) {
    if (e.which == 13) {
        setTimeout(function () {
            $("#bonificacion").select2('open');

        }, 200);
    }
})

function ChangeBonificacion() {

    if ($("#bonificacion").val() != '') {
        AñadirDetalle();
    }

}

$(document).keydown(function (tecla) {


    if (tecla.ctrlKey && tecla.keyCode == 83) {
        tecla.preventDefault();
        guardar();
    }

});