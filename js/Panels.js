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
            
			function abrirEnPestanaInicio(url) {
		      var a = document.createElement("a");
		      a.target = "_blank";
		      a.href = url;
		      a.click();
	        }
            function Backup(){location.href="backup.php";$("#IdCuerpo").html("")} 
			function Activar($id){
			   
			   $activo=$("#IdActivo").val()
			   $("#"+$activo).removeClass("active")
			   $("#"+$id).addClass("active")
			   $("#IdActivo").val($id)
			 }
			 function ActivarTM($id){
			   
			   $activo=$("#IdActivo").val()
			   $("#"+$activo).removeClass("active")
			   $("#"+$id).addClass("active")
			   $("#IdActivo").val($id)
			 }
			 function GrupoUsuarios(){$.post('Adm_GrupoUsuario.php',{},function(datitos){$("#IdCuerpo").html(datitos)}) }
			 function Usuarios(){$.post('Adm_Usuario.php',{},function(datitos){$("#IdCuerpo").html(datitos);}) }
			 function Series(){$.post('Adm_AsignarSerie.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function Cajas(){  $.post('Adm_Caja.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function Areas() { $.post('log_area.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
             function Permisos() { $.post('Conf_Permisos.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

			 function AbrirCajaUsuario(){
				 $user=$("#User").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
					   if(datitos==0){$.post('Adm_AbrirCaja.php',{user:$user},function(datitos){$("#IdCuerpo").html(datitos); 
					    })}else{
						  Activar(0);$("#IdCuerpo").html("");swal("Usuario ya tiene Caja Inicializada", "Error", "warning");
						}  
				  })
			 } 
			 function CerrarCaja(){
				 $user=$("#User").val();
				 $cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
					   if(datitos==0){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); Activar(0);$("#IdCuerpo").html("");}
					   else{ 
						  $.post('Adm_CerrarCaja.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){$("#IdCuerpo").html(datitos); })
						}  
				  })
			 } 
			 function GrupoExamenes(){  $.post('Lab_Grupo.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function Examenes(){ 
			  $grupo=$("#HiNombreGrupo").val();
			  $.post('Lab_Examen.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function Muestras(){  $.post('Lab_Muestra.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function Convenios(){
				 $grupo=$("#HiNombreGrupo").val();
				   $.post('Lab_Convenios.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function Medicos(){
				 $grupo=$("#HiNombreGrupo").val();				
				 $.post('Adm_Medico.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function GenerarOrden(){ 
			 $user=$("#User").val();
			 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 //$.post('Lab_GenerarOrden.php',{},function(datos){$("#IdCuerpo").html(datos); }) 
					   if(datitos==0){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); Activar(0);$("#IdCuerpo").html("");}
					   else{
						 $.post('Lab_GenerarOrden.php',{},function(datos){$("#IdCuerpo").html(datos); }) 
						} 
				  })
			  } 
			  function GenerarOrdenDomicilio(){ $.post('Lab_GenerarOrdenDomicilio.php',{},function(datitos){$("#IdCuerpo").html(datitos); }) }
			  function GenerarOrdenMuestra(){  $.post('Lab_GenerarOrdenMuestra.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			  function ReporCierreCaja(){ 
			   $grupo=$("#HiNombreGrupo").val(); 
			   $.post('ReporteCierresCaja.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); }) 
			  } 
			  
			 function Resultado(){  
			 $grupo=$("#HiNombreGrupo").val();
			     if($grupo=='ADMINISTRADOR' || $grupo=='ADMINISTRACION' || $grupo=='PROCESOS'  || $grupo=='TOMA DE MUESTRA'){
			        $.post('Lab_Resultado.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); }) 
				 }else{
				    $.post('Caja_VerResultado.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); }) 
				 }
			  } 
			 function TomaMuestra(){
			$grupo=$("#HiNombreGrupo").val();$.post('Lab_ControlToma.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function Pacientes(){  $.post('Adm_Paciente.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }	
			 function DocElectronico(){ $.post('DocumentoElectronico.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function DocInnova(){ $.post('DocumentoInnova.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function ResumenVital(){ $.post('ResumenPrecisa.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			 function ResumenInnova(){ $.post('ResumenInnova.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function PagoMedico(){ $.post('PagoMedico.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function AsignarPaquetes(){ $.post('Lab_AsignarPaquetes.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function Egresos(){
				 $.post('Caja_Egresos.php',{},function(datitos){$("#IdCuerpo").html(datitos); }) 
				 /* $user=$("#User").val();
				 $cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
					   if(datitos==0){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); Activar(0);$("#IdCuerpo").html("");}
					   else{ 
						  $.post('Caja_Egresos.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){$("#IdCuerpo").html(datitos); })
						}  
				  })*/
			  }
			 function FacturarConvenios(){ $.post('FacturarConvenios.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function PagoFacturas(){ $.post('PagoFactura.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			 function Dashboard(){
				 $.post('GraficoVentas.php',{},function(datitos){$("#IdCuerpo").html(datitos); })
              }
			 /*function AnularDocumento(){ $.post('AnularDocumento.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }*/
			 function DashboardExcel(){ 
			    url="Librerias/PhpSpreadsheet/ExcelProdTotal.php?anio="+$anio+'&mes='+$mes
		        abrirEnPestanaInicio(url)
			  }
			 function ProduccionXMedico(){
			    $("#IdModalProMed").modal('show') 
			  } 
			 function ReporteProMed(){
				 $ini=$("#TxtIni").val()
				 $fin=$("#TxtFin").val()
				 $emp=$("#IdSucu").val()
				 $ordenar=$("#IdOrdenar").val()
				 
			    url="Pdf_ReporteProduccionMedico.php?ini="+$ini+"&fin="+$fin+"&e="+$emp+'&ord='+$ordenar
		        abrirEnPestanaInicio(url)
			  }
			  
			  function ComisionXMedico(){
			    $("#IdModalComMed").modal('show') 
			  }

			  function ReporteEcografias(){
			    $("#IdModalReporteEco").modal('show') 
			  }
                
              function ReporteDetalleExamenes(){
			    $("#IdModalReporteDetalleExamen").modal('show') 
			  }
              function ListarExamenes(){
			    location.href="Librerias/PhpSpreadsheet/ExcelListarExamenes.php"
			  }

			  function ReporteComMed(){
				 $ini=$("#TxtIni1").val()
				 $fin=$("#TxtFin1").val()
				 $emp=$("#IdSucu1").val()
				 $ordenar=$("#IdOrdenar1").val()
				 
			    url="Pdf_ReporteComisionMedico.php?ini="+$ini+"&fin="+$fin+"&e="+$emp+'&ord='+$ordenar
		        abrirEnPestanaInicio(url)
			  }
			  
			   function ProduccionExamenes(){
			    $("#IdModalProExa").modal('show') 
			  }
			  
			   function DashboardModal(){
			    $("#IdModalDashboard").modal('show') 
			  }
			  
			  function ReporteProExa(){
				 $ini=$("#TxtIni2").val()
				 $fin=$("#TxtFin2").val()
				 $emp=$("#IdSucu2").val()
				 $ordenar=$("#IdOrdenar2").val()
				 
			    url="Pdf_ReporteProduccionExamenes.php?ini="+$ini+"&fin="+$fin+"&e="+$emp+'&ord='+$ordenar
		        abrirEnPestanaInicio(url)
			  }
			  function ReporteProExaExcel(){
				 $ini=$("#TxtIni2").val()
				 $fin=$("#TxtFin2").val()
				 $emp=$("#IdSucu2").val()
				 $ordenar=$("#IdOrdenar2").val()
				 
			    url="Librerias/PhpSpreadsheet/ExcelReporteProduccionExamen.php?ini="+$ini+"&fin="+$fin+"&e="+$emp+'&ord='+$ordenar
		        abrirEnPestanaInicio(url)
			  }
			  
			  function ExcelComisionMed(){
				 $ini=$("#TxtIni1").val()
				 $fin=$("#TxtFin1").val()
				 $emp=$("#IdSucu1").val()
				 $ordenar=$("#IdOrdenar1").val()
	             location.href="Librerias/PhpSpreadsheet/ExcelComisionMedico.php?ini="+$ini+"&fin="+$fin+"&e="+$emp+'&ord='+$ordenar
	          }
			  
              function ExcelReporteEcografia(){
				 $ini=$("#TxtIniEco1").val()
				 $fin=$("#TxtFinEco1").val()
                 location.href="Librerias/PhpSpreadsheet/ExcelReporteEcografia.php?ini="+$ini+"&fin="+$fin
	          }

              function ExcelReporteEAL(){
				 $ini=$("#TxtIniDet1").val()
				 $fin=$("#TxtFinDet1").val()				 				
	             location.href="Librerias/PhpSpreadsheet/ExcelReporteEAL.php?ini="+$ini+"&fin="+$fin
	          }
			  function Informe(){ 
			  $grupo=$("#HiNombreGrupo").val();
			  $.post('Img_Resultado.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); })  }
			  
			 function Mostrar($id){
			   Activar($id)
	           $("#"+$id).show()
              }
			  
			  function Apartados(){ $.post('Adm_Apartado.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			  function CajaDia(){ $.post('AdmCajaDia.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }  
			  function AbrirApartado(){ $("#IdModalApartado").modal('show')  }
			  function MarcarAsistencia(){ $.post('MarcarAsistencia.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			  function NotaCredito(){ $.post('Adm_NotaCredito.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
              function Contratos(){$.post('PV_contratos.php',{},function(datos){$("#IdCuerpoPV").html(datos); }) }
			  //function AtencionSaludpol(){ $.post('AtencionesSaludpol.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			  
			  function Personal(){  $.post('PlanillaPersonal.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
              function Area(){  $.post('PlanillaArea.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
              function Horario(){  $.post('PlanillaHorario.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
              function Marcaciones(){  $.post('PlanillaReporteMarcaciones.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
              function Horas(){  $.post('PlanillaReporteHoras.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }
			  
			  
			  function ControlResultados(){  $.post('ReporteControlResultado.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
			  
			 
		function ListarMensajes(){
          $.post('controlador/Cpaciente.php',{accion:"LIS_APAR"},function(data){
             $data=data.split('$$**')
			 $("#IdCuMen").html($data[0]);$("#CantMensajes,#CantMensajes2").text($data[1])
			 $("#IdApar").html($data[2]);
           })
         }
		 
		  setInterval(ListarMensajes, 3000);	 
		
		 function GrabarApartado(){ 
			    $mensaje=$("#IdMensaje").val()
				swal({
  title: "Confirmacion",
  text: "Está seguro de Crear Apartado",
  icon: "warning",
  buttons: true,
  dangerMode: true}).then((willDelete) => {
  if (willDelete) {
				$.post('controlador/Cpaciente.php',{accion:'APARTADO',mensaje:$mensaje},function(datitos){
				  if(datitos==0){swal("No se Crear Apartado",'Error','error');return false;}
		          if(datitos==1){$("#IdModalApartado").modal('hide');swal("Apartado Creado Correctamente ..",'Felicidades','success');return false;}	
				 })
	              
				} 
      });
				
			   }
			   
			   
			   
			   function ReporteDomicilio(){  $.post('ReporteDomicilio.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }	   
			   function ListaColas(){  $.post('ListaPacientesCola.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }	

// CAJA CHICA
function ActivarMenu($id){
			   $activo=$("#IdActivo").val()
			   $("#"+$activo).removeClass("active")
			   $("#"+$id).addClass("active")
			   $("#IdActivo").val($id)
			 }
function AbrirCajaChica(){
                 //alert('hola');exit;
				 $user=$("#User").val();
                // alert($user)
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
                    // alert(datitos)
					   if(datitos==0){
                    $.post('Adm_AbrirCajaChica.php',{user:$user},function(datitos){ $("#IdCuerpo").html(datitos); })}
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
					   $("#IdCuerpo").html("");}
					   else{ 
						  $.post('Adm_CerrarCajaChica.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){
						  	$("#IdCuerpo").html(datitos); })
						}  
				  })
} 
 function IngresosCajaChica(){
				
				  $user=$("#User").val();
				  $cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpo").html("");}
					   if(datitos==1){
						  $.post('Caja_Ingresos.php',{user:$user,cod_ingreso:$cod_ingreso},function(datitos){
							  
							  
						  	$("#IdCuerpo").html(datitos); })
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
						  	$("#IdCuerpo").html(datitos); })
						}  
				  })
			  }
			 
function PagoMedico(){ 
                $user=$("#User").val();
				$cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpo").html("");}
					   if(datitos==1){
						  $.post('PagoMedico.php',{},function(datitos){$("#IdCuerpo").html(datitos); })
						}  
				  })
			 }
			 
function ResumenCaja(){ 
                $user=$("#User").val();
				$cod_ingreso=$("#HiCodIngreso").val();
				 $.post('controlador/Ccaja.php',{accion:'VAL_USER',user:$user},function(datitos){
				 	   
					   if(datitos==0 ){swal("Usuario No tiene Caja Inicializada", "Error", "warning"); ActivarMenu(0);
					        $("#IdCuerpoCajaChica").html("");}
					   if(datitos==1){
						  $.post('ResumenCajaChica.php',{},function(datitos){$("#IdCuerpo").html(datitos); })
						}  
				  })
			 }
	
function ReporCierreCaja(){  
			 $grupo=$("#HiNombreGrupo").val();
			 $.post('ReporteCierresCaja.php',{grupo:$grupo},function(datitos){$("#IdCuerpo").html(datitos); }) 
			  } 
	     
function ReporIngresos(){$.post('ReporteIngresos.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function ReporEgresos(){$.post('ReporteEgresos.php',{},function(datos){$("#IdCuerpo").html(datos); }) }

// MODULO CUENTAS CORRIENTES
function DocumentosXCobrar(){$.post('CC_PagoDocumento.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function SeguimientoDocumento(){$.post('CC_SeguimientoDoc.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DocCancelados(){$.post('CC_DocCancelados.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DocPendientes(){$.post('CC_DocPendientes.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DocXPagar(){$.post('CC_DocPagar.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
//function GenerarLiquidacion(){$.post('GenerarLiquidacion.php',{},function(datos){$("#IdCuerpoCC").html(datos); }) }
function Detracciones(){$.post('CC_Detraccion.php',{},function(datos){$("#IdCuerpo").html(datos); }) }

// MODULO LOGISTICA
function Proveedores() { $.post('log_proveedor.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Productos() { $.post('log_producto.php', {}, function (datitos) { $("#IdCuerpo").html(datitos) }) }
function CategoriasProducto() { $.post('log_categoria_producto.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function TipoMercaderia() { $.post('log_tipo_existencia.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function UnidadMedida() { $.post('log_unidad_medida.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function ComprobantePago() { $.post('log_tipo_documento.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function TipoOperacion() { $.post('log_tipo_operacion.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Almacenes() { $.post('log_almacen.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function Maquinas() { $.post('log_maquina.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function OrdenCompra() { $.post('log_orden_compra.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

function RealizarCompra() { $.post('log_realizar_compra.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }
function ListarCompras() { $.post('log_compra.php', {}, function (datitos) { $("#IdCuerpo").html(datitos); }) }

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

// MODULO INDICADORES
function DashboardPG(){$.post('PG_KpiFacturacion.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DashboardExamenes(){$.post('PG_KpiExamenes.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DashboardMedico(){$.post('PG_KpiMedicos.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DashboardUsuario(){$.post('PG_KpiUsuarios.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function DashboardPaciente(){$.post('PG_KpiPacientes.php',{},function(datos){$("#IdCuerpo").html(datos); }) }

// MODULO GESTION
function CotizarExamenes(){$.post('Cotizacion.php',{},function(datos){$("#IdCuerpo").html(datos); }) }
function ReporteOrdenes(){  $.post('ReporteOrdenes.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  } 
function ReporteOrdenesInnova(){  $.post('ReporteOrdenesInnova.php',{},function(datitos){$("#IdCuerpo").html(datitos); })  }



			  
			 