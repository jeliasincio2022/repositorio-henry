Listar(1);
var $sucursal = $("#id_cmb_suc").select2({
    dropdownAutoWidth: true,
    width: '97%'
});
var $almacen = $("#id_cmb_alm").select2({
    dropdownAutoWidth: true,
    width: '97%'
});

$("#id_cmb_suc").change(function () {   
        almacenxsucursal()
        setTimeout(function () {
            $("#id_cmb_alm").select2('open');

        }, 200);
});

function almacenxsucursal() {
    $("#id_cmb_alm").val("").change();
    $.post("controlador/Clogistica.php?op=LISTAR_ALMxSUC", {
        sucursal: $("#id_cmb_suc").val(),

    }, function (data) {
        $("#id_cmb_alm").html(data);
    });
}

function Listar() {    
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_LOTE&q=' + $("#buscar").val() + "&id_almacen=" + $("#id_cmb_alm").val(),
        type: "POST",
        //dataType: "json",

        success: function (data) {
            //console.log(data)
            $("#lista").html(data);
        }       
    });    
}

function ReporteLotes() {
    if ($("#id_cmb_alm").val() == '') {
        swal("Seleccione un almacén", "", "warning")
        return false;
    }
    window.location = 'reporte_excel_lotes_almacen.php?almacen=' + $("#id_cmb_alm").val()
}

function PintarFilaLote($id) {

  var $idfilaanterior = $("#IdFilaUsu").val()
  var $par = $idfilaanterior.split('_')
  var $par_int = parseInt($par[1])

  var $par = $idfilaanterior.split('_')
  var $par_int = parseInt($par[1])
  if ($par_int % 2 == 0) {
    // alert("hola")
    $("#" + $idfilaanterior).css({
      "background-color": "#f5f5f5",
      "color": "#000000"
    })
  } else {
    $("#" + $idfilaanterior).css({
      "background-color": "#FFFFFF",
      "color": "#000000"
    })
  }
  $("#" + $id).css({
    "background-color": "#438EB9",
    "color": "#FFFFFF"
  })
  $("#IdFilaUsu").val($id)
}