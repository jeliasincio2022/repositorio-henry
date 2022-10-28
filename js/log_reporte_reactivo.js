var $reactivos = $("#buscar").select2({ dropdownAutoWidth: true, width: '100%' });

Listar(1);
function Listar(pagina) {

    //  $("#lista").html("<tr><td class='text-center' colspan='5'>Cargando ...<td></tr>");
    //    $("#paginacion").html("<span class='btn btn-info'>Anterior</span> <span class='btn btn-success'>1</span> <span class='btn btn-info'>Siguiente</span>")

    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_INGRESOSxREACTIVO&q=' + $("#buscar").val() + "&pagina=" + pagina,
        type: "POST",
        dataType: "json",

        success: function (data) {
            //           console.log(data)
            $("#lista").html("");


            $.each(data, function (key, val) {

                $("#lista").append("<tr>"
                    + "<td width='5%'>" + val[0] + "</td>"
                    + "<td width='20%'>" + val[1] + "</td>"
                    + "<td width='45%'>" + val[2] + "</td>"
                    + "<td width='20%'>" + val[3] + "</td>"
                    + "<td width='5%'>" + val[4] + "</td>"
                    + "<td width='5%'>" + val[5] + "</td>"

                    + "</tr>");

            })

            $.ajax({

                url: 'controlador/Clogistica.php?op=PAG_INGRESOSxREACTIVO&q=' + $("#buscar").val(),
                type: "POST",
                dataType: "json",

                success: function (cont) {
                      console.log(cont)
                    $("#paginacion").html("");
                    if (cont == 0) {
                        $("#lista").html("<td class='text-center' colspan='6'>No se encontraron resultados</tr>");
                        return false
                    }
                    if (pagina > 1) {
                        $("#paginacion").append("<span class='btn btn-xs ' onclick='Listar(" + (pagina - 1) + ")' ><b><icon class='fa fa-chevron-left'></icon></span>");

                    }

                    for (var i = 1; i <= cont; i++) {

                        $("#paginacion").append("<span class='btn btn-xs ' id='pagina" + i + "' onclick='Listar(" + i + ")' >" + i + "</span>");

                    }

                    if (pagina < cont) {
                        $("#paginacion").append("<span class='btn btn-xs 'onclick='Listar(" + (pagina + 1) + ")'><b><icon class=' fa fa-chevron-right'></icon></span>");

                    }

                    $("#pagina" + pagina).removeAttr("class");
                    $("#pagina" + pagina).attr("class", "btn btn-xs btn-info");
                },

                error: function (e) {
                    console.log(e)
                    $("#lista").html("<td class='text-center' colspan='6'>No se encontraron resultados</tr>");

                    $("#paginacion").html("");
                }
            });


        },

        error: function (e) {
            console.log(e)
            $("#paginacion").html("");
            $("#lista").html("<td class='text-center' colspan='6'>No se encontraron resultados<td></tr>");
        }
    });
}

function Detalles(id, fecha1, fecha2) {


    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_REACTIVOxPERIODO&id=' + id + '&fecha1=' + fecha1 + '&fecha2=' + fecha2,
        type: "POST",
        dataType: "json",

        success: function (data) {

            console.log(data)
            $("#lista-detalles-examenes").html("");


            $.each(data, function (key, val) {

                $("#lista-detalles-examenes").append("<tr>"
                +"<td width='10%'>" + val[0] + "</td>"
                +"<td width='20%'>" + val[1] + "</td>"
                +"<td width='50%'>" + val[2] + "</td>"
                +"<td width='20%'>" + val[3] + "</td>"

                +"</tr>");

            })
            $("#ModalDetalles").modal("show");

        },

        error: function (e) {
            console.log(e)
            $("#ModalDetalles").modal("show");

            $("#lista-detalles-examenes").html("<td class='text-center' colspan='5'>No se encontraron resultados<td></tr>");
        }
    });


    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_CALIBRACIONESxPERIODO&id=' + id + '&fecha1=' + fecha1 + '&fecha2=' + fecha2,
        type: "POST",
        dataType: "json",

        success: function (data) {

            console.log(data)
            $("#lista-detalles-calibraciones").html("");


            $.each(data, function (key, val) {

                $("#lista-detalles-calibraciones").append("<tr>"
                +"<td width='10%'>" + val[0] + "</td>"
                +"<td width='20%'>" + val[1] + "</td>"
                +"<td width='50%'>" + val[2] + "</td>"
                +"<td width='20%'>" + val[3] + "</td>"


                +"</tr>");

            })
            $("#ModalDetalles").modal("show");

        },

        error: function (e) {
            console.log(e)
            $("#ModalDetalles").modal("show");

            $("#lista-detalles-calibraciones").html("<td class='text-center' colspan='5'>No se encontraron resultados<td></tr>");
        }
    });
}
function abrirModal() {
    $("#ir_valor").val("1");
    $("#ModalRegistrar").modal("show");
    $("#ir_cantidad,#ir_fecha,#id").val("");
    $reactivos.val("").change();
    $("#ir_fecha").focus();

}

function editar(id, fecha, id_reactivo, cantidad) {

    $("#ir_id").val(id);
    $("#ir_fecha").val(fecha);
    $("#ir_cantidad").val(cantidad);

    $reactivos.val(id_reactivo).change();
    $("#ir_valor").val("2");



    $("#ModalRegistrar").modal("show");




}

function eliminar(id) {
    $("#ModalEliminar").modal("show");
    $("#eliminar").val(id);
}



$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();


    $.ajax({

        url: 'controlador/Clogistica.php?op=NUEVO_INGRESO_REACTIVO',
        type: "POST",
        data: $(this).serialize(),

        success: function (data) {
            $('#ModalRegistrar').modal('hide');
            Listar(1);
            console.log(data);
            $('#formRegistrar').trigger("reset");
            if (data == 1) {

                swal("Datos registrados Correctamente ..", "Felicitaciones", "success");

                return false;
            } else
                if (data == 0) {
                    swal("Datos no registrados Correctamente ..", "Error", "error");
                    return false;
                } else {
                    swal("Datos no registrados Correctamente ..", "Error", "error");
                    return false;
                }

        },
        error: function (e) {
            console.log(e);
            swal("Datos no registrados Correctamente ..", "Error", "error");
        }
    });
});


$("#formEliminar").on("submit", function (e) {
    e.preventDefault();

    $.ajax({

        url: 'controlador/Clogistica.php?op=ELIMINAR_INGRESO_REACTIVO',
        type: "POST",
        data: { id: $("#eliminar").val() },

        success: function (data) {
            $('#ModalEliminar').modal('hide');
            Listar(1);
            console.log(data);
            if (data == 1) {

                swal("Datos eliminados Correctamente ..", "Felicitaciones", "success");

                return false;
            } else
                if (data == 0) {
                    swal("Datos no eliminados Correctamente ..", "Error", "error");
                    return false;
                } else {
                    swal("Datos no eliminados Correctamente ..", "Error", "error");
                }

        },
        error: function (e) {
            console.log(e);
            swal("Datos no eliminados Correctamente ..", "Error", "error");
        }
    });
});