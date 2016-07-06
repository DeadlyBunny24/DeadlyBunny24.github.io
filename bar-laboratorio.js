var ml = [30, 20, 10, 100],
    wl = 960 - ml[1] - ml[3],
    hl = 400 - ml[0] - ml[2];

var formatl = d3.format(",.0f");

var xl = d3.scale.linear().range([0, wl]),
    yl = d3.scale.ordinal().rangeRoundBands([0, hl], .1);

var xAxisl = d3.svg.axis().scale(xl).orient("top").tickSize(-hl),
    yAxisl = d3.svg.axis().scale(yl).orient("left").tickSize(0);

var svgl = d3.select("#grafico_laboratorio").append("svg")
    .attr("width", wl + ml[1] + ml[3])
    .attr("height", hl + ml[0] + ml[2])
  .append("g")
    .attr("transform", "translate(" + ml[3] + "," + ml[0] + ")");

d3.csv("datos-laboratorio.csv", function(error, data) {
  if (error) throw error;

  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.value = +d.value; });
  data.sort(function(a, b) { return b.value - a.value; });

  // Set the scale domain.
  xl.domain([0, d3.max(data, function(d) { return d.value; })]);
  yl.domain(data.map(function(d) { return d.name; }));

  var barl = svgl.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + yl(d.name) + ")"; });

  barl.append("rect")
      .attr("width", function(d) { return xl(d.value); })
      .attr("height", yl.rangeBand());

  barl.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return xl(d.value); })
      .attr("y", yl.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return formatl(d.value); });

  svgl.append("g")
      .attr("class", "x axis")
      .call(xAxisl);

  svgl.append("g")
      .attr("class", "y axis")
      .call(yAxisl);
});
