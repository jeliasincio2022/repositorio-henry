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
            
			
			function ActivarPG($id){
			   $activo=$("#IdActivo").val()
			   $("#"+$activo).removeClass("active")
			   $("#"+$id).addClass("active")
			   $("#IdActivo").val($id)
			 }
			
	function DashboardPG(){$.post('PG_KpiFacturacion.php',{},function(datos){$("#IdCuerpoPG").html(datos); }) }
	function DashboardExamenes(){$.post('PG_KpiExamenes.php',{},function(datos){$("#IdCuerpoPG").html(datos); }) }
	function DashboardMedico(){$.post('PG_KpiMedicos.php',{},function(datos){$("#IdCuerpoPG").html(datos); }) }
	function DashboardUsuario(){$.post('PG_KpiUsuarios.php',{},function(datos){$("#IdCuerpoPG").html(datos); }) }
	function DashboardPaciente(){$.post('PG_KpiPacientes.php',{},function(datos){$("#IdCuerpoPG").html(datos); }) }
		 