var $producto = $("#producto").select2({ dropdownAutoWidth: true, width: '100%' });

/*function ReporteExcel() {
    if ($("#producto").val() == '') {
        swal("Seleccione un producto", "", "warning")
        return false;
    }
    window.location = 'reporte_excel_kardex.php?producto=' + $("#producto").val()
}*/

/*Listar(1);*/
function Listar() {

    //  $("#lista").html("<tr><td class='text-center' colspan='5'>Cargando ...<td></tr>");
    //    $("#paginacion").html("<span class='btn btn-info'>Anterior</span> <span class='btn btn-success'>1</span> <span class='btn btn-info'>Siguiente</span>")
    $pro=$("#producto").val()
    $ini=$("#Ini").val();$fin=$("#Fin").val()
    
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_KARDEX&producto='+$pro+'&i='+$ini+'&f='+$fin,
        type: "POST",
        dataType: "json",

        success: function (data) {
            console.log(data)
            $("#lista").html("");


            $.each(data, function (key, val) {

                if (val[5] != '') {
                    entrada = "<td width='8%' align='right'>S/. " + parseFloat(val[6]).toFixed(2) + "</td>" + "<td width='8%'align='right'>S/. " + parseFloat(val[7]).toFixed(2) + "</td>";
                } else {
                    entrada = "<td width='8%'>" + parseFloat(val[6]).toFixed(2) + "</td>" + "<td width='8%'>" + parseFloat(val[7]).toFixed(2) + "</td>";
                }

                if (val[8] != '') {
                    salida = "<td width='8%' align='right'>S/." + parseFloat(val[9]).toFixed(2) + "</td>" + "<td width='8%'align='right'>S/.  " + parseFloat(val[10]).toFixed(2) + "</td>";
                } else {
                    salida = "<td width='8%'>" + parseFloat(val[9]).toFixed(2) + "</td>" + "<td width='8%'>" + parseFloat(val[10]).toFixed(2) + "</td>"
                }
                
                $("#lista").append("<tr>"
                    + "<td width='5.6%'>" + val[0] + "</td>"
                    + "<td width='5.6%' align='right'>" + val[1] + "</td>"
                    + "<td width='5.6%'>" + val[2] + "</td>"
                    + "<td width='5.6%' align='right'>" + val[3] + "</td>"
                    + "<td width='5.6%' align='right'>" + val[4] + "</td>"
                    + "<td width='8%' align='right'>" + val[5] + "</td>"
                    + entrada
                    + "<td width='8%' align='right'>" + val[8] + "</td>"
                    + salida
                    + "<td width='8%' align='right'>" + val[11] + "</td>"
                  
                    + "<td width='8%' align='right'>S/. " + parseFloat(val[12]).toFixed(2) + "</td>"
                    + "<td width='8%' align='right'>S/.  " + parseFloat(val[13]).toFixed(2) + "</td>"
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