var $reactivos = $("#exr_id_reactivo").select2({ dropdownAutoWidth: true, width: '100%' });

Listar(1);
function Listar(pagina) {

    //  $("#lista").html("<tr><td class='text-center' colspan='5'>Cargando ...<td></tr>");
    //    $("#paginacion").html("<span class='btn btn-info'>Anterior</span> <span class='btn btn-success'>1</span> <span class='btn btn-info'>Siguiente</span>")

    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_EXAMEN&q='+$("#buscar").val() + "&pagina="+pagina,
        type: "POST",
        dataType: "json",
        contetnType:"application_json; charset=utf-8",

        success: function (data) {
            console.log(data)
            $("#lista").html("");


            $.each(data, function (key, val) {

                $("#lista").append("<tr>"
                +"<td width='5%'>" + val[0] + "</td>"
                +"<td width='88%'>" + val[1] + "</td>"
                +"<td width='5.6%'>" + val[2] + "</td>"

                +"</tr>");

            })

            $.ajax({

                url: 'controlador/Clogistica.php?op=PAG_EXAMEN&q=' + $("#buscar").val(),
                type: "POST",
                dataType: "json",

                success: function (cont) {
                    console.log(cont)
                    $("#paginacion").html("");
                    if (cont == 0) {
                        $("#lista").html("<td class='text-center' colspan='3'>No se encontraron resultados</tr>");
                        return false
                    }
                    if (pagina > 1) {
                        $("#paginacion").append("<span class='btn btn-xs ' onclick='Listar(" + (pagina - 1) + ")' ><b><icon class='fa fa-chevron-left'></icon></span>");

                    }

                    for (var i = 1; i <= cont; i++) {

                        $("#paginacion").append("<span class='btn btn-xs ' id='pagina" + i + "' onclick='Listar(" + i + ")' >" + i + "</span>");

                    }

                    if (pagina < cont) {
                        $("#paginacion").append("<span class='btn btn-xs 'onclick='Listar(" + (pagina + 1) + ")'><b><icon class='fa fa-chevron-right'></icon></span>");

                    }

                    $("#pagina" + pagina).removeAttr("class");
                    $("#pagina" + pagina).attr("class", "btn btn-xs btn-info");
                },

                error: function (e) {
                    console.log(e)
                    $("#lista").html("<td class='text-center' colspan='3'>No se encontraron resultados</td>");

                    $("#paginacion").html("");
                }
            });


        },

        error: function (e) {
            console.log(e)
            $("#paginacion").html("");
            $("#lista").html("<td class='text-center' colspan='3'>No se encontraron resultados<td>");
        }
    });
}


function detalles(id_examen,nombre) {
    $reactivos.val("").change()
    $("#exr_id_examen").val(id_examen)
    $("#nombre_examen").html(nombre)

    Listar_detalles(id_examen)
    $("#exr_nombre").focus()
    $("#ModalDetalles").modal("show");

}

function Listar_detalles(id_examen) {


    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_EXAMEN_REACTIVO&id_examen=' + id_examen,
        type: "POST",
        dataType: "json",

        success: function (data) {
            console.log(data)
            $("#lista_detalles").html("");

            $.each(data, function (key, val) {

                $("#lista_detalles").append("<tr>"
                +"<td width='10%'>" + val[0] + "</td>"
                +"<td width='60%'>" + val[1] + "</td>"
                +"<td width='30%'>" + val[2] + "</td>"
                +"<td width='30%'>" + val[3] + "</td>"

                +"</tr>");

            })




        },

        error: function (e) {
            console.log(e)
            $("#lista_detalles").html("<td class='text-center' colspan='3'>No se encontraron resultados<td></tr>");
        }
    });
}




function editar(id) {
    $("#ModalDetalles").modal("show");
    $("#exr_id_examen").val(id_examen)
    Listar_detalles(id_examen)
    $("#exr_nombre").focus()

}

function eliminar(id) {

        $.ajax({

            url: 'controlador/Clogistica.php?op=ELIMINAR_EXAMEN_REACTIVO',
            type: "POST",
            data: { id: id },

            success: function (data) {
                $('#ModalEliminar').modal('hide');
                Listar_detalles($("#exr_id_examen").val())
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
   
}



$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();


    $.ajax({

        url: 'controlador/Clogistica.php?op=NUEVO_EXAMEN_REACTIVO',
        type: "POST",
        data: $(this).serialize(),

        success: function (data) {
            Listar_detalles($("#exr_id_examen").val())

            console.log(data);
            $('#formRegistrar').trigger("reset");
            $reactivos.val("").change()
            if (data == 1) {

                swal("Datos registrados Correctamente ..", "Felicitaciones", "success");

                return false;
            } else
                if (data == 0) {
                    swal("Datos no registrados Correctamente ..", "Error", "error");
                    return false;
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


