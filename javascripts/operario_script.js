$( document ).ready(function() {
        init();
    });

var ope = null;
		$.getJSON("json/operario.JSON",function(response){
			ope = response;
		});	
	
	
function init(){
	//Inicialización
	$("#container_sucursales").hide();
	$("#container_datos").hide();


	
	// Objetos de datos
	//Operario
		
		

		
	
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
	
	//Compa�ero
		var parseTime = d3.timeParse("%M");

		var svg = d3.select("svg");

		var margin = {top: 30, right: 50, bottom: 30, left: 30},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom,
			labelPadding = 3;

		var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.requestTsv("data-por-mes.tsv", function(d) {
		  d.date = parseTime(d.date);
		  for (var k in d) if (k !== "date") d[k] = +d[k];
		  return d;
		}, function(error, data) {
		  if (error) throw error;

		  var series = data.columns.slice(1).map(function(key) {
			return data.map(function(d) {
			  return {
				key: key,
				date: d.date,
				value: d[key]
			  };
			});
		  });

		  var x = d3.scaleTime()
			  .domain([data[0].date, data[data.length - 1].date])
			  .range([0, width]);

		  var y = d3.scaleLinear()
			  .domain([0, d3.max(series, function(s) { return d3.max(s, function(d) { return d.value; }); })])
			  .range([200, 0]);

		  var z = d3.scaleCategory10();

		  g.append("g")
			  .attr("class", "axis axis--x")
			  .attr("transform", "translate(0," + height + ")")
			  .call(d3.axisBottom(x));

		  var serie = g.selectAll(".serie")
			  .data(series)
			.enter().append("g")
			  .attr("class", "serie");

		  serie.append("path")
			  .attr("class", "line")
			  .style("stroke", function(d) { return z(d[0].key); })
			  .attr("d", d3.line()
				  .x(function(d) { return x(d.date); })
				  .y(function(d) { return y(d.value); }));

		  var label = serie.selectAll(".label")
			  .data(function(d) { return d; })
			.enter().append("g")
			  .attr("class", "label")
			  .attr("transform", function(d, i) { return "translate(" + x(d.date) + "," + y(d.value) + ")"; });

		  label.append("text")
			  .attr("dy", ".35em")
			  .text(function(d) { return d.value; })
			.filter(function(d, i) { return i === data.length - 1; })
			.append("tspan")
			  .attr("class", "label-key")
			  .text(function(d) { return " " + d.key; });

		  label.append("rect", "text")
			  .datum(function() { return this.nextSibling.getBBox(); })
			  .attr("x", function(d) { return d.x - labelPadding; })
			  .attr("y", function(d) { return d.y - labelPadding; })
			  .attr("width", function(d) { return d.width + 2 * labelPadding; })
			  .attr("height", function(d) { return d.height + 2 * labelPadding; });
		});
						  
}