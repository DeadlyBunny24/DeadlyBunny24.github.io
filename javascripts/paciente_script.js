$( document ).ready(function() {
        init();
    });

function init(){
	//Inicialización
	$("#container_sucursales").hide();
	$("#container_datos").hide();


	
		// Objetos de datos
		//Examenes
		var exa;
		$.getJSON("../json/examenes.JSON",function(response){
			exa=response;
			exa.examenes.forEach(function(item){
				$("#examenes_contenido").append("<tr>");
				$("#examenes_contenido tr:last-child").append("<td>"+item.tipo+"</td>");
				$("#examenes_contenido tr:last-child").append("<td>"+item.fecha+"</td>");
				if(item.estado=="estado_1"){
					$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_espera'"+"></div></td>");
				}else{
					$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_completo'"+"></div></td>");
				}	
			});	
		});
				
		//Sucursales
		var suc;
		$.getJSON("../json/sucursales.JSON",function(response){
			suc = response;
			//Comportamiento de menú de sucursales
			$(".carousel-inner .item:first-child img").attr("src","");
			$(".carousel-inner .item:nth-child(2) img").attr("src","");
			$("#datos_sucursal p:first-child span").text(suc.lista[0].direccion);
			$("#datos_sucursal p:nth-child(2) span").text(suc.lista[0].descripcion);
			$("#datos_sucursal p:nth-child(3) span").text(suc.lista[0].horario);
			$(".carousel-inner .item:first-child img").attr("src","imagenes/surcursal_1_1.jpg");
			$(".carousel-inner .item:nth-child(2) img").attr("src","imagenes/surcursal_1_2.jpg");
			
			// Inicialización del API de google maps
			initMap(-2.148726,-79.9648);	
			//Sucursal_1
			$(".dropdown-menu li:first-child a").click(function(){
				$(".carousel-inner .item:first-child img").attr("src","");
				$(".carousel-inner .item:nth-child(2) img").attr("src","");
				$("#datos_sucursal p:first-child span").text(suc.lista[0].direccion);
				$("#datos_sucursal p:nth-child(2) span").text(suc.lista[0].descripcion);
				$("#datos_sucursal p:nth-child(3) span").text(suc.lista[0].horario);
				$(".carousel-inner .item:first-child img").attr("src","imagenes/surcursal_1_1.jpg");
				$(".carousel-inner .item:nth-child(2) img").attr("src","imagenes/surcursal_1_2.jpg");
				
				// Inicialización del API de google maps
				initMap(-2.148726,-79.9648);
			});
			
			//Sucursal_2
			$(".dropdown-menu li:nth-child(2) a").click(function(){
				$(".carousel-inner .item:first-child img").attr("src","");
				$(".carousel-inner .item:nth-child(2) img").attr("src","");
				$("#datos_sucursal p:first-child span").text(suc.lista[1].direccion);
				$("#datos_sucursal p:nth-child(2) span").text(suc.lista[1].descripcion);
				$("#datos_sucursal p:nth-child(3) span").text(suc.lista[1].horario);
				$(".carousel-inner .item:first-child img").attr("src","imagenes/surcursal_2_1.jpg");
				$(".carousel-inner .item:nth-child(2) img").attr("src","imagenes/surcursal_2_2.jpg");
				
				// Inicialización del API de google maps
				initMap(-2.145274,-79.948906);
			});
		});
	
		//Datos usuario
		var user;
		$.getJSON("../json/usuario.JSON",function(response){
			user = response;
			$("#nombre_i").val(user.datos[0].nombre);
			$("#apellido_i").val(user.datos[0].apellido);
			$("#correo_i").val(user.datos[0].correo);
			$("#cedula_i").val(user.datos[0].cedula);
			$("#direccion_i").val(user.datos[0].direccion);
			$("#telefono_i").val(user.datos[0].telefono);
			$("#imagen_i").attr("src",user.datos[0].img);
		});
		
		//Sucursales
		/* var suc = jQuery.parseJSON('{"lista":[\
		{"direccion":"direccion_1","descripcion":"descripcion_1","horario":"horario_1"},\
		{"direccion":"direccion_2","descripcion":"descripcion_2","horario":"horario_2"}\
		]}');
		
		//Operario
		var ope = jQuery.parseJSON('{"lista":[\
		{"paciente":"paciente_1","centro":"centro_1","examen":"examen_1"},\
		{"paciente":"paciente_2","centro":"centro_2","examen":"examen_2"}\
		]}');
		
		//Laboratorista
		var lab = jQuery.parseJSON('{"lista":[\
		{"paciente":"paciente_1","centro":"centro_1","examen":"examen_1", "estado":"estado_1"},\
		{"paciente":"paciente_2","centro":"centro_2","examen":"examen_2","estado":"estado_2"}\
		]}');
	
		//Datos usuario
		var user = jQuery.parseJSON('{"datos":[\
		{"nombre":"nombre_1","apellido":"Apellido_1","correo":"correo@espol", "cedula":"111111111", "direccion":"Direccion_1","telefono":"000000000","img":"imagenes/user_icon.png"},\
		{"nombre":"nombre_2","apellido":"Apellido_2","correo":"correo@espol", "cedula":"111111111", "direccion":"Direccion_2","telefono":"000000000","img":"imagenes/user_icon.png"}\
		]}');
		console.log(user); */

	
	//Comportamiento del menú principal
	$(".menu li:nth-child(2) a").click(function(){
		$(".breadcrumb li h2").text("Sucursales");
		$(".menu li:nth-child(2)").siblings("li").removeClass("active");
		$(".menu li:nth-child(2)").addClass("active");
		$("#container_examenes").hide();
		$("#container_datos").hide();	
		$("#container_sucursales").show();
	});	

	$(".menu li:nth-child(1) a").click(function(){
		$(".breadcrumb li h2").text("Examenes");
		$(".menu li:nth-child(1)").siblings("li").removeClass("active");
		$(".menu li:nth-child(1)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_datos").hide();	
		$("#container_examenes").show();		
	});

	$(".menu li:nth-child(3) a").click(function(){
		$(".breadcrumb li h2").text("Datos Personales");
		$(".menu li:nth-child(3)").siblings("li").removeClass("active");
		$(".menu li:nth-child(3)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_examenes").hide();
		$("#container_datos").show();	
		$("#nombre").val(user.datos.nombre);
		$("#apellido").val(user.datos.apellido);
		$("#correo").val(user.datos.correo);
		$("#cedula").val(user.datos.cedula);
		$("#direccion").val(user.datos.direccion);
		$("#telefono").val(user.datos.telefono);		
	});	
	
	//Comportamiento de los exámenes
	
	

	
	//Comportamiento datos
	//Cargar datos
	
	
	//Comportamiento boton editar
	$("#boton_editar").click(function(){
		$("#nombre_i").prop('disabled', false);
		$("#apellido_i").prop('readonly', false);
		$("#correo_i").prop('readonly', false);
		$("#cedula_i").prop('readonly', false);
		$("#direccion_i").prop('readonly', false);
		$("#telefono_i").prop('readonly', false);
		$("#boton_editar").text("Guardar");
	});
	$("#boton_cancelar").click(function(){
		$("#nombre_i").prop('readonly', true);
		$("#apellido_i").prop('readonly', true);
		$("#correo_i").prop('readonly', true);
		$("#cedula_i").prop('readonly', true);
		$("#direccion_i").prop('readonly', true);
		$("#telefono_i").prop('readonly', true);
		$("#boton_editar").text("Editar");
	});
	
	
		
	
	
}
	
function initMap(lat_p,lng_p) {
	var mapDiv = document.getElementById('map');
	var myLatLng = {lat: lat_p, lng: lng_p};
						
						
	var map = new google.maps.Map(mapDiv, {
		center: myLatLng,
		zoom: 15
	});
						
	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Salud Primero S.A'
	});
						  
}