
var width = self.frameElement ? 960 : innerWidth,
    height = self.frameElement ? 500 : innerHeight;

var data = d3.range(20).map(function() { return [Math.random() * width-100, Math.random() * height-100]; });

var color = d3.scale.category10();

var drag = d3.behavior.drag()
    .origin(function(d) { return {x: d[0], y: d[1]}; })
    .on("drag", dragged);

var tcColours = ['#f24a6b', '#fff101', '#1d2588'];

d3.select("article")
    .on("touchstart", nozoom)
    .on("touchmove", nozoom)
  .append("svg")
    .attr("width", width - 100)
    .attr("height", height - 300)
  .selectAll("circle")
    .data(data)
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 32)
    .style("fill", function(d, i) { return tcColours[i]; })
    .on("click", clicked)
    .call(drag);

function dragged(d) {
  d[0] = d3.event.x, d[1] = d3.event.y;
  if (this.nextSibling) this.parentNode.appendChild(this);
  d3.select(this).attr("transform", "translate(" + d + ")");
}

function clicked(d, i) {
  if (d3.event.defaultPrevented) return; // dragged

  d3.select(this).transition()
      .style("fill", "black")
      .attr("r", 64)
    .transition()
      .attr("r", 32)
      .style("fill", function(d, i) { return tcColours[i]; });
}

function nozoom() {
  d3.event.preventDefault();
}