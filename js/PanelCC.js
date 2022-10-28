jQuery(function($) {
	$("#IdModalApartado").on('shown.bs.modal', function(){
        $(this).find('#IdMensaje').focus();
    });
			   $('#sidebar2').insertBefore('.page-content');
			   $('#navbar').addClass('h-navbar');
			   $('.footer').insertAfter('.page-content');
			   
			   $('.page-content').addClass('main-content');
			   
			   $('.menu-toggler[data-target="#sidebar2"]').insertBefore('.navbar-brand');
			   $('[data-rel=tooltip]').tooltip();
			   
			   $(document).on('settings.ace.two_menu', function(e, event_name, event_val) {
				 if(event_name == 'sidebar_fixed') {
					 if( $('#sidebar').hasClass('sidebar-fixed') ) $('#sidebar2').addClass('sidebar-fixed')
					 else $('#sidebar2').removeClass('sidebar-fixed')
				 }
			   }).triggerHandler('settings.ace.two_menu', ['sidebar_fixed' ,$('#sidebar').hasClass('sidebar-fixed')]);
			   
			   $('#sidebar2[data-sidebar-hover=true]').ace_sidebar_hover('reset');
			   $('#sidebar2[data-sidebar-scroll=true]').ace_sidebar_scroll('reset', true);			   
})
            
			
			function ActivarCC($id){
			   $activo=$("#IdActivo").val()
			   $("#"+$activo).removeClass("active")
			   $("#"+$id).addClass("active")
			   $("#IdActivo").val($id)
			 }
			
	     
		 function DocumentosXCobrar(){$.post('CC_PagoDocumento.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
		 function SeguimientoDocumento(){$.post('CC_SeguimientoDoc.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
		 function DocCancelados(){$.post('CC_DocCancelados.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
		 function DocPendientes(){$.post('CC_DocPendientes.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
		 function DocXPagar(){$.post('CC_DocPagar.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
	     function GenerarLiquidacion(){$.post('GenerarLiquidacion.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
		 function Detracciones(){$.post('CC_Detraccion.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
			 