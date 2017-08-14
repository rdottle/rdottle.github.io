

// function createCircle(){

// var svgContainer = d3.select("header").append("svg")
//                                     .attr("width", 200)
//                                      .attr("height", 200);
 
//  //Draw the Circle
//  var circle = svgContainer.append("circle")
//                           .attr("cx", 20)
//                           .attr("cy", 20)
//                          .attr("r", 10);

// console.log("test");
// return circle;
// }

// createCircle();



// create data
var data = [];
for (var i=0; i < 108; i++) {
 data.push(i);
}

// Scale for radius
var xr = d3.scale
        .linear()
        .domain([0, 108])
        .range([0, 27]);

// Scale for random position
var randomPosition = function(d) {
	var windowWidth = $(window).width();
    return Math.random() * windowWidth;
}


var tcColours = ['#FDBB30', '#EE3124', '#EC008C', '#F47521', '#7AC143', '#00B0DD'];
var randomTcColour = function() {
  return Math.floor(Math.random() * tcColours.length);
};


// SVG viewport
var svg = d3.select('header')
  .append('svg')
    .attr('width', '100%')
    .attr('height', '40vh');

var update = function() {
    var baseCircle = svg.selectAll('circle');
    var baseRect = svg.selectAll('rect');

    // Bind data
    baseCircle = baseCircle.data(data);
    baseRect = baseRect.data(data);

    // set the rects
    baseRect.transition()
            .duration(200)
            .attr('width', xr)
            .attr('height', xr)
            .attr('x', randomPosition)
            .attr('y', randomPosition)
            .style('fill', tcColours[randomTcColour()]);

    baseRect.enter()
            .append('rect')
            .attr('width', xr)
            .attr('height', xr)
            .attr('x', randomPosition)
            .attr('y', randomPosition)
            .style('fill', tcColours[randomTcColour()]);


    // set the circles
    baseCircle.transition()
            .duration(250)
            .attr('r', xr)
            .attr('cx', randomPosition)
            .attr('cy', randomPosition)
            .attr('fill', "none")
            .attr("stroke-width", 4)
            .style('stroke', tcColours[randomTcColour()]);
 
    baseCircle.enter()
            .append('circle')
            .attr('r', xr)
            .attr('cx', randomPosition)
            .attr('cy', randomPosition)
            .attr('fill', "none")
            .attr("stroke-width", 4)
            .style('stroke', tcColours[randomTcColour()]);


}

setInterval(function() {
    update();
}, 512);
