$( document ).ready(function() {
        init();
    });

function init(){
		//Laboratorista
		var lab = jQuery.parseJSON('{"lista":[\
		{"paciente":"paciente_1","centro":"centro_1","examen":"examen_1", "estado":"estado_1"},\
		{"paciente":"paciente_2","centro":"centro_2","examen":"examen_2","estado":"estado_2"}\
		]}');
	
	//Comportamiento de los exámenes
	lab.lista.forEach(function(item){
		$("#examenes_contenido").append("<tr>");
		$("#examenes_contenido tr:last-child").append("<td>"+item.paciente+"</td>");
		$("#examenes_contenido tr:last-child").append("<td>"+item.centro+"</td>");
		$("#examenes_contenido tr:last-child").append("<td>"+item.examen+"</td>");
		if(item.estado=="estado_1"){
			$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_espera'"+"></div></td>");
		}else{
			$("#examenes_contenido tr:last-child").append("<td><div id="+"'circle_completo'"+"></div></td>");
		}	
		$("#examenes_contenido tr:last-child").append('<td>'+			
			'<button class="btn btn-warning btn-xs" data-toggle="modal" data-target="#notificar"><i class="glyphicon glyphicon-pencil"></i> Notificar</button>'+
			'&thinsp;'+
			'<button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#ingresar"><i class="glyphicon glyphicon-plus"></i> Ingresar</button>'+
			'</td>');	
	});	
						  
}