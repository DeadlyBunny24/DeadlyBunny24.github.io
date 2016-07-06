var mC = [30, 20, 10, 100],
    wC = 960 - mC[1] - mC[3],
    hC = 400 - mC[0] - mC[2];

var formatC = d3.format(",.0f");

var xC = d3.scale.linear().range([0, wC]),
    yC = d3.scale.ordinal().rangeRoundBands([0, hC], .1);

var xAxisC = d3.svg.axis().scale(xC).orient("top").tickSize(-hC),
    yAxisC = d3.svg.axis().scale(yC).orient("left").tickSize(0);

var svgC = d3.select("#grafico_ciudades").append("svg")
    .attr("width", wC + mC[1] + mC[3])
    .attr("height", hC + mC[0] + mC[2])
  .append("g")
    .attr("transform", "translate(" + mC[3] + "," + mC[0] + ")");

d3.csv("datos-ciudad.csv", function(error, data) {
  if (error) throw error;

  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.value = +d.value; });
  data.sort(function(a, b) { return b.value - a.value; });

  // Set the scale domain.
  xC.domain([0, d3.max(data, function(d) { return d.value; })]);
  yC.domain(data.map(function(d) { return d.name; }));

  var barC = svgC.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + yC(d.name) + ")"; });

  barC.append("rect")
      .attr("width", function(d) { return xC(d.value); })
      .attr("height", yC.rangeBand());

  barC.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return xC(d.value); })
      .attr("y", yC.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return formatC(d.value); });

  svgC.append("g")
      .attr("class", "x axis")
      .call(xAxisC);

  svgC.append("g")
      .attr("class", "y axis")
      .call(yAxisC);
});
