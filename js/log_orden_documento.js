Listar(1);

function Listar() {
    $.ajax({
        url: 'controlador/Clogistica.php?op=LIS_ORD_DOC&q=' + $("#buscar").val(),
        type: "POST",
        //dataType: "json",

        success: function (data) {
            //console.log(data)
            $("#lista").html(data);
        },
    });    
}

function ExcelOrdenDoc(){    
    $buscar=$("#buscar").val()    
    location.href="Librerias/PhpSpreadsheet/ExcelOrdenDocumento.php?buscar="+$buscar
}

function PintarFilaOrdoc($id) {

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