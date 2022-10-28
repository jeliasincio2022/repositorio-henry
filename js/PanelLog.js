jQuery(function ($) {
    $("#IdModalApartado").on('shown.bs.modal', function () {
        $(this).find('#IdMensaje').focus();
    });
    $('#sidebar2').insertBefore('.page-content');
    $('#navbar').addClass('h-navbar');
    $('.footer').insertAfter('.page-content');

    $('.page-content').addClass('main-content');

    $('.menu-toggler[data-target="#sidebar2"]').insertBefore('.navbar-brand');
    $('[data-rel=tooltip]').tooltip();

    $(document).on('settings.ace.two_menu', function (e, event_name, event_val) {
        if (event_name == 'sidebar_fixed') {
            if ($('#sidebar').hasClass('sidebar-fixed')) $('#sidebar2').addClass('sidebar-fixed')
            else $('#sidebar2').removeClass('sidebar-fixed')
        }
    }).triggerHandler('settings.ace.two_menu', ['sidebar_fixed', $('#sidebar').hasClass('sidebar-fixed')]);

    $('#sidebar2[data-sidebar-hover=true]').ace_sidebar_hover('reset');
    $('#sidebar2[data-sidebar-scroll=true]').ace_sidebar_scroll('reset', true);
})

function abrirEnPestanaInicio(url) {
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
}
function Backup() { location.href = "backup.php"; $("#IdCuerpo").html("") }
function Activar($id) {

    $activo = $("#IdActivo").val()
    $("#" + $activo).removeClass("active")
    $("#" + $id).addClass("active")
    $("#IdActivo").val($id)
}

function Proveedores() { $.post('log_proveedor.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Productos() { $.post('log_producto.php', {}, function (datitos) { $("#IdCuerpo").html(datitos) }) }
function CategoriasProducto() { $.post('log_categoria_producto.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function TipoMercaderia() { $.post('log_tipo_existencia.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function UnidadMedida() { $.post('log_unidad_medida.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function ComprobantePago() { $.post('log_tipo_documento.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function TipoOperacion() { $.post('log_tipo_operacion.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Almacenes() { $.post('log_almacen.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Maquinas() { $.post('log_maquina.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Areas() { $.post('log_area.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

function OrdenCompra() { $.post('log_orden_compra.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

function RealizarCompra() { $.post('log_realizar_compra.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Compras() { $.post('log_compra.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

function OrdenDocumento() { $.post('log_orden_documento.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

function InventarioInicial(){ $.post('log_inventario_inicial.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function TransferirAlmacen() { $.post('log_transferir_almacen.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function TransferirArea() { $.post('log_transferir_area.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function ListarTransferirArea(){ $.post('log_transferir_area_lis.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Lotes() { $.post('log_lote.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function FraccionarLote() { $.post('log_fraccionar_lote.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

function Kardex() { $.post('log_kardex.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function KardexAlmacen(){ $.post('log_kardex_almacen.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) };

function ReporteReactivo() { $.post('log_reporte_reactivo.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function ReactivosExamen() { $.post('log_reactivos_examen.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function ExamenesClientes() { $.post('log_examenes_clientes.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Calibraciones() { $.post('log_calibracion.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }



function ExamenesClientes() { $.post('log_examenes_clientes.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }





