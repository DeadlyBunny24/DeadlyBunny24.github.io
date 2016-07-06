$( document ).ready(function() {
        init();
    });

function init(){
	//Inicialización
	$("#boton_inicio").click(function(){
		if($("#username").val()=="usuario"){
			$("#boton_inicio").attr("href", "home.html")
		}
		else if($("#username").val()=="operario"){
			$("#boton_inicio").attr("href", "operario.html")
		}
		else{
			$("#boton_inicio").attr("href", "laboratorista.html")
		}
	});
}