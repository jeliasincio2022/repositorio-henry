var $clientes = $("#ca_id_cliente").select2({ dropdownAutoWidth: true, width: '100%' });
var $examenes = $("#ca_id_examen").select2({ dropdownAutoWidth: true, width: '100%' });


Listar(1);
function Listar(pagina) {

    //  $("#lista").html("<tr><td class='text-center' colspan='5'>Cargando ...<td></tr>");
    //    $("#paginacion").html("<span class='btn btn-info'>Anterior</span> <span class='btn btn-success'>1</span> <span class='btn btn-info'>Siguiente</span>")

    $.ajax({

        url: 'controlador/Clogistica.php?op=LIS_CLIENTE_EXAMEN&q=' + $("#buscar").val() + "&pagina=" + pagina,
        type: "POST",
        dataType: "json",

        success: function (data) {
            console.log(data)
            $("#lista").html("");


            $.each(data, function (key, val) {

                $("#lista").append("<tr>"
                +"<td width='10%'>" + val[0] + "</td>"
                +"<td width='10%'>" + val[1] + "</td>"
                +"<td width='40%'>" + val[2] + "</td>"
                +"<td width='30%'>" + val[3] + "</td>"

                +"<td width='10%'>" + val[4] + "</td>"

                +"</tr>");

            })

            $.ajax({

                url: 'controlador/Clogistica.php?op=PAG_CLIENTE_EXAMEN&q=' + $("#buscar").val() + "&pagina=" + pagina,
                type: "POST",
                dataType: "json",

                success: function (cont) {
                    console.log(cont)
                    $("#paginacion").html("");
                    if (cont == 0) {
                        $("#lista").html("<td class='text-center' colspan='5'>No se encontraron resultados</tr>");
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
                    $("#lista").html("<td class='text-center' colspan='5'>No se encontraron resultados</tr>");

                    $("#paginacion").html("");
                }
            });


        },

        error: function (e) {
            console.log(e)
            $("#paginacion").html("");
            $("#lista").html("<td class='text-center' colspan='5'>No se encontraron resultados<td></tr>");
        }
    });
}


function abrirModal() {
    $("#ca_valor").val("1");
    $("#ModalRegistrar").modal("show");
    $("#ca_fecha,#ca_id").val("");
    $clientes.val("").change();
    $examenes.val("").change();

    $("#ca_fecha").focus()

}

function editar(id, fecha,id_cliente,id_examen) {
    $("#ca_valor").val("2");
    $("#ca_id").val(id);
    $("#ca_fecha").val(fecha);
    $("#ca_id_cliente").val(id_cliente).change();
    $("#ca_id_examen").val(id_examen).change();

    $("#ModalRegistrar").modal("show");




}

function eliminar(id) {
    $("#ModalEliminar").modal("show");
    $("#eliminar").val(id);
}



$("#formRegistrar").on("submit", function (e) {
    e.preventDefault();


    $.ajax({

        url: 'controlador/Clogistica.php?op=NUEVO_CLIENTE_EXAMEN',
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

        url: 'controlador/Clogistica.php?op=ELIMINAR_CLIENTE_EXAMEN',
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