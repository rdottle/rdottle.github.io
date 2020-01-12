
import * as d3 from 'd3';
import './../css/index.scss';
import 'intersection-observer';

const projectData = require("./../data/projects.json");


// import map class and find parent el
import { aProject } from "./aProject.js";
const projectContainer = d3.select("#all-projects");


document.addEventListener("DOMContentLoaded", function(){
    d3.select("body").style("visibility", "visible");
	let projjies = new aProject({
		  data: projectData,
		  container: projectContainer
		});

});
