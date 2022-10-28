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
            
			
			function ActivarMenu($id){
			   $activo=$("#IdActivo").val()
			   $("#"+$activo).removeClass("active")
			   $("#"+$id).addClass("active")
			   $("#IdActivo").val($id)
			 }
			 
			 function AbrirCajaChica(){
				 $user=$("#User").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
					   if(datitos==0){$.post('Adm_AbrirCajaChica.php',{user:$user},function(datitos){$("#IdCuerpoCajaChica").html(datitos); 
					    })}
					   if(datitos==1){
						  ActivarMenu(0);$("#IdCuerpoCajaChica").html('');swal("Usuario ya tiene Caja Inicializada", "Error", "warning");
						}  
				  })
			 } 
			 function CerrarCajaChica(){
				 $user=$("#User").val();
				 $cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
					   if(datitos==0){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					   $("#IdCuerpoCajaChica").html("");}
					   else{ 
						  $.post('Adm_CerrarCajaChica.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){
						  	$("#IdCuerpoCajaChica").html(datitos); })
						}  
				  })
			 } 
			 
			 function IngresosCajaChica(){
				
				  $user=$("#User").val();
				  $cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpoCajaChica").html("");}
					   if(datitos==1){
						  $.post('Caja_Ingresos.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){
							  
							  
						  	$("#IdCuerpoCajaChica").html(datitos); })
						}  
				  })
			  }
			 
			 function EgresosCajaChica(){
				
				  $user=$("#User").val();
				  $cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpoCajaChica").html("");}
					   if(datitos==1){
						  $.post('Caja_Egresos.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){
						  	$("#IdCuerpoCajaChica").html(datitos); })
						}  
				  })
			  }
			 
			 function PagoMedico(){ 
			 	//$.post('PagoMedico.php',{},function(datitos){$("#IdCuerpoCajaChica").html(datitos); })  
                $user=$("#User").val();
				$cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpoCajaChica").html("");}
					   if(datitos==1){
						  $.post('PagoMedico.php',{},function(datitos){$("#IdCuerpoCajaChica").html(datitos); })
						}  
				  })
			 }
			 
			 function ResumenCaja(){ 
			 	//$.post('PagoMedico.php',{},function(datitos){$("#IdCuerpoCajaChica").html(datitos); })  
                $user=$("#User").val();
				$cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpoCajaChica").html("");}
					   if(datitos==1){
						  $.post('ResumenCajaChica.php',{},function(datitos){$("#IdCuerpoCajaChica").html(datitos); })
						}  
				  })
			 }
	
			 function ReporCierreCaja(){  
			 $grupo=$("#HiNombreGrupo").val();
			 $.post('ReporteCierresCaja.php',{grupo:$grupo},function(datitos){$("#IdCuerpoCajaChica").html(datitos); }) 
			  } 
	     
		 function ReporIngresos(){$.post('ReporteIngresos.php',{},function(datos){$("#IdCuerpoCajaChica").html(datos); }) }
	     function ReporEgresos(){$.post('ReporteEgresos.php',{},function(datos){$("#IdCuerpoCajaChica").html(datos); }) }
			 