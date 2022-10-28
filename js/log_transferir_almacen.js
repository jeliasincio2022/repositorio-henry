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

    var $sucursal_des = $("#TAsuc_des").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });


    var $almacen_des = $("#TAalm_des").select2({
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
        swal("Ingrese un producto", "", "warning")
        $("#btn_añadir").attr("disabled", false)

        return false;
    }

    if (cantidad == ""  || cantidad<=0) {
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
        setTimeout(function () {
            $("#TAalm_org").select2('open');

        }, 100);
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
    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {
        sucursal: $("#TAsuc_org").val(),
    }, function (data) {

        $("#TAalm_org").html(data);
        // console.log(data);

    });
}


function LotexAlmacen() {
    $("#TAproducto").html("");
    $.post("controlador/Clogistica.php?op=LISTAR_LOTExALM", {
        almacen: $("#TAalm_org").val(),
    }, function (data) {

        $("#TAproducto").html(data);
        // console.log(data);

    });
}

$("#TAsuc_des").change(function () {
    if ($("#TAsuc_des").val() != "") {
        almacenxsucursal2()
        setTimeout(function () {
            $("#TAalm_des").select2('open');

        }, 100);
    }
});
$("#TAalm_des").change(function () {
    if ($("#TAalm_des").val() != "") {
        setTimeout(function () {
            $("#TAproducto").select2('open');

        }, 100);
    }
});


function almacenxsucursal2() {
    $("#TAalm_des").html("");
    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {
        sucursal: $("#TAsuc_des").val(),
    }, function (data) {

        $("#TAalm_des").html(data);
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

    $.post("controlador/Clogistica.php?op=PRODUCTOxLOTE", {
        lote: $("#TAproducto").val(),
    }, function (data) {

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
        return false
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

    if ($("#TAalm_des").val() == "") {
        swal("Campo requerido", "Seleccione un almacén de destino", "warning");
        setTimeout(function () {
            $("#TAalm_des").select2('open');
        }, 200);
        return false;
    }

    if ($("#TAalm_des").val() == $("#TAalm_org").val()) {
        swal("Almacenes iguales", "Seleccione un almacén distinto", "warning");

        return false;
    }


    if (transferencias.length == 0) {
        swal("Añada productos a la lista", " ", "warning");
        return false;
    }



    $.post("controlador/Clogistica.php?op=TRANSEFERIR_ALM", {


        almacen_origen: $("#TAalm_org").val(),
        almacen_destino: $("#TAalm_des").val(),

        transferencias: JSON.stringify(transferencias)



    }, function (data) {

        if (data == 1) {
            swal("Correcto", "Orden registrada correctamente", "success");
        } else {
            swal("Error", "Orden no registrada ", "error");
        }
        $("#TAalm_org,#TAalm_des").html("<option value=''>Seleccione</option>");
        $("#TAsuc_org,#TAsuc_des,#TAalm_org,#TAalm_des,#TAproducto,#TAcantidad,#TAstock,#TAunidad").val("").change()
        transferencias = Array()
        listar()
        stock = ''
        unidad = ''
        console.log(data);
    });








}
