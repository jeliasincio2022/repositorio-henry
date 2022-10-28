var $producto = $("#producto").select2({ dropdownAutoWidth: true, width: '97%' });
var $almacen_select2 = $("#id_cmb_alm").select2({
    dropdownAutoWidth: true,
    width: '97%'
});
var $sucursal_select2 = $("#id_cmb_suc").select2({
    dropdownAutoWidth: true,
    width: '97%'
});

function ReporteExcel() {
    if ($("#producto").val() == '') {
        swal("Seleccione un producto", "", "warning")
        return false;

    }
    if ($("#id_cmb_alm").val() == '') {
        swal("Seleccione un almacén", "", "warning")
        return false;

    }
    window.location = 'reporte_excel_kardex_almacen.php?producto=' + $("#producto").val()+ "&almacen="+ $("#id_cmb_alm").val() 
}

Listar(1);

function ChangeProducto() {

    setTimeout(function () {
        $("#id_cmb_suc").select2('open');

    }, 200);

}
function ChangeSucursal() {

    //$("#id_cmb_alm").val("").trigger('change');
    $("#id_cmb_alm").html("");

    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {
        sucursal: $("#id_cmb_suc").val(),

    }, function (data) {

        $("#id_cmb_alm").html(data);

    });

    setTimeout(function () {
        $("#id_cmb_alm").select2('open');

    }, 200);

}

function Listar(pagina) {

    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_KARDEX_ALM&producto=' + $("#producto").val() + "&almacen="+ $("#id_cmb_alm").val() +"&pagina=" + pagina,
        type: "POST",
        dataType: "json",

        success: function (data) {
            console.log(data)
            $("#lista").html("");


            $.each(data, function (key, val) {

              
                if (val[4] != '') {
                    entrada = "<td width='8%'align='right'>S/. " + parseFloat(val[5]).toFixed(2) + "</td>" + "<td width='10%'align='right'>S/. " + parseFloat(val[6]).toFixed(2) + "</td>";
                } else {
                    entrada = "<td width='8%'>" + parseFloat(val[5]).toFixed(2) + "</td>" + "<td width='10%'>" + parseFloat(val[6]).toFixed(2) + "</td>";
                }

                if (val[9] != '') {
                    salida = "<td width='8%' align='right'>S/." + parseFloat(val[8]).toFixed(2) + "</td>" + "<td width='10%'align='right'>S/.  " +parseFloat(val[9]).toFixed(2) + "</td>";
                } else {
                    salida = "<td width='8%'>" + parseFloat(val[8]).toFixed(2) + "</td>" + "<td width='10%'>" +parseFloat(val[9]).toFixed(2) + "</td>"

                }

                $("#lista").append("<tr>"
                    + "<td width='10%'>" + val[0] + "</td>"
                    + "<td width='5%' align='right'>" + val[1] + "</td>"
                    + "<td width='8%'>" + val[2] + "</td>"
                    + "<td width='5%' align='right'>" + val[3] + "</td>"
                    + "<td width='5%' align='right'>" + val[4] + "</td>"
                    + entrada
                    + "<td width='5%' align='right'>" + val[7] + "</td>"
                    + salida
                    + "<td width='5%' align='right'>" + val[10] + "</td>"
                    + "<td width='10%' align='right'>S/. " + parseFloat(val[11]).toFixed(2) + "</td>"
                    + "<td width='10%' align='right'>S/.  " + parseFloat(val[12]).toFixed(2) + "</td>"
                    + "</tr>");

            })
        },

        error: function (e) {
            console.log(e)
            $("#paginacion").html("");
            $("#lista").html("<td class='text-center' colspan='12'>No se encontraron resultados<td></tr>");
        }
    });
}