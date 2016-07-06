var mM = [30, 20, 10, 100],
    wM = 960 - mM[1] - mM[3],
    hM = 400 - mM[0] - mM[2];

var formatM = d3.format(",.0f");

var xM = d3.scale.linear().range([0, wM]),
    yM = d3.scale.ordinal().rangeRoundBands([0, hM], .1);

var xAxisM = d3.svg.axis().scale(xM).orient("top").tickSize(-hM),
    yAxisM = d3.svg.axis().scale(yM).orient("left").tickSize(0);

var svgM = d3.select("#grafico_meses").append("svg")
    .attr("width", wM + mM[1] + mM[3])
    .attr("height", hM + mM[0] + mM[2])
  .append("g")
    .attr("transform", "translate(" + mM[3] + "," + mM[0] + ")");

d3.csv("datos-mes.csv", function(error, data) {
  if (error) throw error;

  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.value = +d.value; });
  //data.sort(function(a, b) { return b.value - a.value; });

  // Set the scale domain.
  xM.domain([0, d3.max(data, function(d) { return d.value; })]);
  yM.domain(data.map(function(d) { return d.name; }));

  var barM = svgM.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + yM(d.name) + ")"; });

  barM.append("rect")
      .attr("width", function(d) { return xM(d.value); })
      .attr("height", yM.rangeBand());

  barM.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return xM(d.value); })
      .attr("y", yM.rangeBand() / 2)
      .attr("dx", -3)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return formatM(d.value); });

  svgM.append("g")
      .attr("class", "x axis")
      .call(xAxisM);

  svgM.append("g")
      .attr("class", "y axis")
      .call(yAxisM);
});
