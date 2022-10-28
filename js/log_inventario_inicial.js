$(document).ready(function () {

    Listar(1);

    var $sucursal = $("#IIid_cmb_suc").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });


    var $almacen = $("#IIid_cmb_alm").select2({
        dropdownAutoWidth: true,
        width: '97%'
    });


    var $producto = $("#IIid_cmb_pro").select2({
        dropdownAutoWidth: true,
        width: '97%'

    })


    $('.numero').on("keypress", function () {
        if (event.keyCode > 47 && event.keyCode < 60 || event.keyCode == 46) {

        } else {
            event.preventDefault();
        }

    });

});



$("#IIid_cmb_suc").change(function () {
    almacenxsucursal()
  
})



function Listar() {

    //  $("#lista").html("<tr><td class='text-center' colspan='5'>Cargando ...<td></tr>");
    //    $("#paginacion").html("<span class='btn btn-info'>Anterior</span> <span class='btn btn-success'>1</span> <span class='btn btn-info'>Siguiente</span>")

    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_INVT_INI&nombre_producto=' + $("#buscar-nombre_producto").val() + "&nro_lote=" + $("#buscar-nro_lote").val(),
        type: "POST",
        dataType: "json",

        success: function (data) {
            console.log(data)
            $("#lista").html("");


            $.each(data, function (key, val) {

                $("#lista").append("<tr>"
                    + "<td width='5%'>" + val[0] + "</td>"
                    + "<td width='40%' >" + val[1] + "</td>"
                    + "<td width='5%'>" + val[2] + "</td>"
                    + "<td width='5%' align='right'>" + val[3] + "</td>"
                    + "<td width='10%' >" + val[4] + "</td>"
                    + "<td width='5%'>" + val[5] + "</td>"
                    + "<td width='10%'>" + val[6] + "</td>"
                    + "<td width='20%'>" + val[7] + "</td>"

                  


                    + "</tr>");

            })

        },

        error: function (e) {
            console.log(e)
            $("#paginacion").html("");
            $("#lista").html("<td class='text-center' colspan='7'>No se encontraron resultados<td></tr>");
        }
    });
}

function abrirModal() {


    $("#ModalRegistrar").modal("show");

}



$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();

    if ($('#IIid_cmb_pro').val() == '') {
        swal("Seleccione producto ..", "", "warning");

        return false;
    }

    if ($('#IIfecha').val() == '') {
        swal("Seleccione fecha de vencimiento ..", "", "warning");

        return false;
    }

    if ($('#IInro_lote').val() == '') {
        swal("Ingrese número de lote ..", "", "warning");

        return false;
    }

    if ($('#IIcantidad').val() == '') {
        swal("Ingrese cantidad ..", "", "warning");
        return false;
    }

    if ($('#IIid_cmb_alm').val() == '') {
        swal("Seleccione almacen ..", "", "warning");

        return false;
    }



    $.ajax({

        url: 'controlador/Clogistica.php?op=NUEVO_INVT_INI',
        type: "POST",
        data: $(this).serialize(),

        success: function (data) {
            $('#ModalRegistrar').modal('hide');
            Listar(1);
            console.log(data);
            $("#IIid_cmb_suc").val("").trigger('change');
            $("#IIid_cmb_alm").val("").trigger('change');
            $("#IIid_cmb_pro").val("").trigger('change');
            $("#IIcantidad,#IIfecha,#IIprecio,#IInro_lote").val("")


            if (data == 2) {

                swal("Producto ya añadido al inventario inicial ..", "", "warning");

                return false;
            } 

            if (data == 1) {

                swal("Datos registrados Correctamente ..", "Felicitaciones", "success");

                return false;
            } else

                swal("Datos no registrados Correctamente ..", "Error", "error");


        },
        error: function (e) {
            console.log(e);
            swal("Datos no registrados Correctamente ..", "Error", "error");
        }
    });
});



function almacenxsucursal() {
    $("#IIid_cmb_alm").html("");
    // $('#OCid_cmb_alm').chosen('destroy');
    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {
        sucursal: $("#IIid_cmb_suc").val(),

    }, function (data) {
        $("#IIid_cmb_alm").html(data);

    });
}