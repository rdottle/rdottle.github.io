// create data
var articles = 10;
var data = articles;


// Scale for radius
var xr = 60;

// Scale for random position

var tcColours = ['#f24a6b', '#fff101', '#1d2588'];
var randomTcColour = function() {
  return Math.floor(Math.random() * tcColours.length);
};


//Selecting the text
    var txt=d3.selectAll("article").select("h1")
    	.style('color', tcColours[randomTcColour()]);
	//d3.selectAll("article").select("h1").html()

 var dataset = [],
    i = 0;

    for(i=0; i<10; i++){
        dataset.push(Math.round(Math.random()*100));
    }        

// var circlediv = document.getElementById("circles");
// var svg = d3.select(circlediv).append("svg");

// var tip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function(d) {
//     return "<strong>Frequency:</strong> <span style='color:red'>" + "thing" + "</span>";
//   })


// function redraw(){

//         var width = circlediv.clientWidth;
//         var height = circlediv.clientHeight;

//         svg
//           .attr("width", width)
//           .attr("height", height)
//           .attr("class", "circle");

//     }
// var circlecolour = tcColours[randomTcColour()];

// redraw();
//  window.addEventListener("resize", redraw);

// var update = function(){
//     var width = circlediv.clientWidth;
//     var height = circlediv.clientHeight;
//     d3.selectAll("circle").remove();
//     var sampleSVG = d3.select("#circles")
//     var randomPosition = function(d) {
//          return Math.random() * (width);}

//     //d3.selectAll("svg > *").remove();
//     var randomheight = function(d) {
//     return (Math.random()* (height));
//     }
//     svg.selectAll("circle")
//         .data(dataset)
//         .enter().append("circle")
//         .style("stroke", circlecolour)
//         .style("fill", circlecolour)
//         .attr('r', 50)
//         .attr("cx", randomPosition)
//         .attr("cy", randomheight)
//       //  .on('mouseover', tip.show)
//       //  .on('mouseout', tip.hide);


// }

// console.log($('article').height());

update();
setInterval(function() {
    update();
}, 3000);


