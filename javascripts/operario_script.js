$( document ).ready(function() {
        init();
    });

function init(){
	//Inicialización
	$("#container_sucursales").hide();
	$("#container_datos").hide();


	
	// Objetos de datos
		//Examenes
		var exa = jQuery.parseJSON('{"examenes":[\
		{"tipo":"tipo_1","fecha":"fecha_1","estado":"estado_1"},\
		{"tipo":"tipo_2","fecha":"fecha_2","estado":"estado_2"}\
		]}');
		
		//Sucursales
		var suc = jQuery.parseJSON('{"lista":[\
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
		{"nombre":"nombre_1","apellido":"Apellido_1","correo":"correo@espol", "cedula":"111111111", "direccion":"Direccion_1","telefono":"000000000"},\
		{"nombre":"nombre_2","apellido":"Apellido_2","correo":"correo@espol", "cedula":"111111111", "direccion":"Direccion_2","telefono":"000000000"}\
		]}');
		

	
	//Comportamiento del menú principal
	$(".menu li:nth-child(2) a").click(function(){
		$(".breadcrumb li h2").text("Reportes");
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
		$(".breadcrumb li h2").text("Información de registro");
		$(".menu li:nth-child(3)").siblings("li").removeClass("active");
		$(".menu li:nth-child(3)").addClass("active");
		$("#container_sucursales").hide();
		$("#container_examenes").hide();
		$("#container_datos").show();	
	});	
	
	//Comportamiento de los exámenes
	ope.lista.forEach(function(item){
		$("#examenes_contenido").append("<tr>");
		$("#examenes_contenido tr:last-child").append("<td>"+item.paciente+"</td>");
		$("#examenes_contenido tr:last-child").append("<td>"+item.centro+"</td>");
		$("#examenes_contenido tr:last-child").append("<td>"+item.examen+"</td>");
		$("#examenes_contenido tr:last-child").append('<td>'+			
			'<button class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editar"></i> Editar</button>'+
			'&thinsp;'+
			'<button type="button" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#eliminar"><i class="glyphicon glyphicon-trash"></i> Borrar</button>'+
			'</td>');	
	});	
	
						  
}