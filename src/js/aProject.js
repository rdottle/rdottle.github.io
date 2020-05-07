import * as d3 from 'd3';

class aProject {
    
  constructor(opts) {
    	this.data = opts.data;
    	this.container = opts.container;
  		this.width = window.innerWidth;
  		this.height = window.innerHeight;
    	this.centre = { x: this.width/2, y: this.height/2 };
 		  this.forceStrength = 0.01;
  	  this.svg = null;
  	  this.bubbles = null;
  	  this.labels = null;
  	  this.nodes = [];
      this.mobile = window.innerWidth < 1200 ? true : false;
  	  this.simulation = null;
      this.chartDraw();
	}


bubs() {

  this.simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(this.charge))
    // .force('center', d3.forceCenter(centre.x, centre.y))
    .force('x', d3.forceX().strength(this.forceStrength).x(this.centre.x))
    .force('y', d3.forceY().strength(this.forceStrength).y(this.centre.y))
    .force('collision', d3.forceCollide().radius(d => d.radius + 1));

  this.simulation.stop();

}

 createNodes(rawData) {
    // use max size in the data as the max in the scale's domain
    // note we have to ensure that size is a number
    const maxSize = d3.max(rawData, d => +d.year);

    // size bubbles based on area
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxSize])
      .range([0, window.innerWidth < 1200 ? 40 : 80])

    // use map() to convert raw data into node data
    const myNodes = rawData.map(d => ({
      ...d,
      radius: radiusScale(+d.year),
      size: +d.year,
      x: Math.random() * this.width-200,
      y: Math.random() * this.height-250
    }))

    return myNodes;
  }

  chartDraw() {
	  this.simulation = d3.forceSimulation()
  	    .force('charge', d3.forceManyBody().strength(this.charge))
  	    // .force('center', d3.forceCenter(centre.x, centre.y))
  	    .force('x', d3.forceX().strength(this.forceStrength).x(this.centre.x))
  	    .force('y', d3.forceY().strength(this.forceStrength).y(this.centre.y))
  	    .force('collision', d3.forceCollide().radius(d => d.radius + 10));

	  // force simulation starts up automatically, which we don't want as there aren't any nodes yet
	  this.simulation.stop();
  	this.nodes = this.createNodes(this.data);
    let mobe = this.mobile;

	  function dragstarted(d, simulation) {
       
      d3.select("#" +d.id).classed("highlight", true)
          .transition()
          .attr("width", d=> d.radius*2.2)

      let title = d.title;
      let tooltip = d3.select(".tooltip");
      tooltip.classed("none", false);
      tooltip.select(".title").html(title)
      d3.selectAll(".proj-image:not(.highlight)").classed("off", true);
      if (mobe) {
        tooltip.style("position", "fixed").style("bottom", "0%")
      }
      if (!d3.event.active) {
  	     simulation.alphaTarget(.03).restart();
  	  }
  	  d.fx = d.x;
  	  d.fy = d.y;
  	}

	  function dragged(d, simulation) {
      d3.selectAll(".proj-image:not(.highlight)").classed("off", true);
      d3.select(".tooltip")
        .classed("none", false);

  	  d.fx = d3.event.x;
  	  d.fy = d3.event.y;
  	}
  	function dragended(d, simulation) {
        // d3.select(".tooltip")
        //   .classed("none", true)
        d3.selectAll(".proj-image").classed("off", false);
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select("#" +d.id).classed("highlight", false)
            .transition()
            .attr("width", d=> d.radius*2)

  	  if (!d3.event.active) simulation.alphaTarget(.03);
  	  d.fx = null;
  	  d.fy = null;
  	}

    // create svg element inside provided selector
    this.svg = this.container
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    this.svg.style("opacity", "0")
      .transition()
      .duration(5000)
      .ease(d3.easeLinear)
      .style("opacity", "1")
    // bind nodes data to circle elements
    this.elements = this.svg.selectAll('.bubble')
      .data(this.nodes, d => d.year)
      .enter()
      .append('g')
      .append("a")
      .attr("xlink:href", d => d.url)
      .attr('target', "_blank")
      .style("outline", "none")
 	    .call(d3.drag() // call specific function when circle is dragged
         .on("start", (d)  => dragstarted(d, this.simulation))
         .on("drag", (d) => dragged(d, this.simulation))
         .on("end", (d) => dragended(d, this.simulation))
        );


    const bubbles = this.elements
      .append('circle')
      .classed('bubble', true)
      .attr('r', d => d.radius)
      .attr('fill', "none")


	  const images = this.elements.append("svg:image")
      .attr("id", d=> d.id)
		  .attr("class","proj-image")
	    .attr("xlink:href",  (d) => { return "../images/" + d.image;})
	    .attr("width", d=> d.radius*2)
	    .attr("height",d=> d.radius*2)

	  const labels = this.elements.append("text")

    // set simulation's nodes to our newly created nodes array
    // simulation starts running automatically once nodes are set
    this.simulation.nodes(this.nodes)
      .on('tick', ticked)
      .restart();

    function ticked() {
      bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

      images
        .attr('x', d => d.x-25)
        .attr('y', d => d.y-25)
    }

    this.setEvents = images
          // Append hero text
          .on( 'click',  (d,i,els) => {
            let title = d.title;
            d3.select(".tooltip")
              .classed("none", false)
              .style("left", d3.event.pageX +20 + "px")
              .style("top", d3.event.pageY +20 + "px");

            d3.select(".tooltip .title").html(title)

            d3.select(els[i])
              .transition()
              .attr("width", d=> d.radius*2.2);
            d3.select(els[i]).classed("highlight", true)
            d3.selectAll(".proj-image:not(.highlight)").classed("off", true);

           })

          .on( 'mouseenter', (d,i, els) => {

          	let title = d.title;
          	d3.select(".tooltip")
          		.classed("none", false)
	          	.style("left", d3.event.pageX +20 + "px")
				      .style("top", d3.event.pageY +20 + "px");

			      d3.select(".tooltip .title").html(title)

          	d3.select(els[i])
              .transition()
	   		      .attr("width", (d) => {return d.radius*2.2})
              .attr("height", (d) => {return d.radius*2.2})

    	   		d3.select(els[i]).classed("highlight", true)
    		    d3.selectAll(".proj-image:not(.highlight)").classed("off", true);
          })
          // set back
          .on( 'mouseleave', (d,i,els) => {
          	d3.select(".tooltip")
          		.classed("none", true)
          	d3.selectAll(".proj-image").classed("off", false);
          	d3.selectAll(".highlight").classed("highlight", false);

          	d3.select(els[i])
              .transition()
              .attr("height", (d) => {return d.radius*2})
	   		      .attr("width", d=> d.radius*2);
          });
 }

  charge(d) {
    return Math.pow(d.radius, 2.0) * 0.01
  }


}

export { aProject };