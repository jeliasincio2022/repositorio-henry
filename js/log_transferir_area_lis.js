Listar();

var $area = $("#id_cmb_area").select2({
    dropdownAutoWidth: true,
    width: '97%'
});

$("#id_cmb_area").change(function () {  Listar() });

function ExcelTranferenciaArea(){    
    $buscar=$("#buscar").val()    
    $id_area=$("#id_cmb_area").val()    
    location.href="Librerias/PhpSpreadsheet/ExcelTransferenciaArea.php?buscar="+$buscar+"&id_area="+$id_area
}

function Listar(pagina) {
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_TRANS_AREA&nombre_producto=' + $("#buscar").val() + "&id_area=" + $("#id_cmb_area").val(),
        type: "POST",
        //dataType: "json",

        success: function (data) {
            //console.log(data)
            $("#lista").html(data);
        },
    });    
}

function PintarFilaTrans($id) {

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