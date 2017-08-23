// create data
var articles = 10;
var data = articles;


// Scale for radius
var xr = 100;

// Scale for random position
var windowWidth = $(window).width();

var randomPosition = function(d) {
    var windowWidth = $(window).width();
    return Math.random() * windowWidth;
}




var tcColours = ['#f24a6b', '#fff101', '#1d2588'];
var randomTcColour = function() {
  return Math.floor(Math.random() * tcColours.length);
};


//Selecting the text
    var txt=d3.selectAll("article").select("h1")
    	.style('color', tcColours[randomTcColour()]);
	//d3.selectAll("article").select("h1").html()



// var svg = d3.select("#circles")
//     .append('svg')
//     .attr('width', windowWidth)
//     .attr('height', '20vh');


// //var update = function(){

// svg.selectAll('circle')
//     .data(data)
//     .enter()
//     .append('circle')
//     .attr('width', xr)
//     .attr('r', xr)
//     .attr('cx', randomPosition())
//     .attr('cy', 100)
//     .style('fill', tcColours[randomTcColour()]);


 var dataset = [],
    i = 0;

    for(i=0; i<5; i++){
        dataset.push(Math.round(Math.random()*100));
    }        


var update = function(){

var randomheight = function(d) {

var windowheight = $('svg.test').height();
    return (windowheight * Math.random());
}
    var sampleSVG = d3.select("#circles")
        .append("svg")
        .attr("class", "test")
        .attr("width", windowWidth)
        .attr("height", '40vh');    

    sampleSVG.selectAll("circle")
        .data(dataset)
        .enter().append("circle")
        .style("stroke", "gray")
        .style("fill", "black")
        .attr('r', 40)
        .attr("cx", randomPosition)
        .attr("cy", randomheight);


console.log(randomheight);

}

update();
