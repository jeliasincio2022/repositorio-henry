Listar(1);
function Listar(pagina) {

    //  $("#lista").html("<tr><td class='text-center' colspan='5'>Cargando ...<td></tr>");
    //    $("#paginacion").html("<span class='btn btn-info'>Anterior</span> <span class='btn btn-success'>1</span> <span class='btn btn-info'>Siguiente</span>")

    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_COM&q=' + $("#buscar").val()+'&fecha_inicio='+$("#fecha_inicio").val()+'&fecha_fin='+$("#fecha_fin").val() ,
        type: "POST",
        dataType: "json",

        success: function (data) {
            $("#lista").html("");


            $.each(data, function (key, val) {

                $("#lista").append("<tr class='todo-item'>"
               +"<td width='2%'>" + val[0] + "</td>"
               +"<td width='5%'>" + val[1] + "</td>"
               +"<td width='5%'>" + val[15] + "</td>"
               +"<td width='8%'>" + val[2] + "</td>"

               +"<td width='5%'>" + val[3] + "</td>"
               +"<td width='5%'>" + val[5] + "</td>"
               +"<td width='10%'>" + val[6] + "</td>"
               +"<td width='5%'class='text-right'>" + val[7] + "</td>"
               +"<td width='5%' class='text-right'>S/.  " + parseFloat(val[8]).toFixed(2)  + "</td>"
               +"<td width='5%' class='text-right'>" + parseFloat(val[9]).toFixed(2)  + "</td>"
               +"<td width='5%' class='text-right'>S/.  " + parseFloat(val[10]).toFixed(2)  + "</td>"
               +"<td width='5%' class='text-right'>S/. " + parseFloat(val[11]).toFixed(2) + "</td>"
               +"<td width='5%'>" + val[12] + "</td>"
               +"<td width='5%'>" + val[13] + "</td>"
               +"<td width='3%'>" + val[14] + "</td>"
               +"</tr>");

            })


        },

        error: function (e) {
            console.log(e)
            $("#paginacion").html("");
            $("#lista").html("<td class='text-center' colspan='15'>No se encontraron resultados<td></tr>");
        }
    });
}


function detalles(id) {
    $.post("controlador/Clogistica.php?op=LIS_COMPRA_DETALLE", { compra: id }, function (data) {
        console.log(data)
        $("#detalles").html(data)

    }).fail(function (e) {
        console.log(e)

    })
    $("#ModalRegistrar").modal("show");
}

