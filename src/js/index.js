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



var clientID = '800533449318-mvcj3fknreqrubcs7iddvdg11bej92b7.apps.googleusercontent.com';
var API = 'AIzaSyAsznDdFF8js8ofIaiRwi1Tnfd_LrAe8vM';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var projects;


function getData() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '17I9IMsBv39Ygm-uQtylamYfIBj0I6GppfK-pVI94NiA',
      range: 'Sheet1!A2:F',
    }).then(function(response) {
      makeGrid(response.result.values);
    });
  }

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

function initClient() {
  gapi.client.init({
    apiKey: API,
    clientId: clientID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    getData();
  });
}

console.log('help');

function makeGrid(projects){
  projects.forEach(function(row) {
    var link = d3.select('.project-container').append('a').attr('class','box').attr('href',row[5])
    var project = link.append('div').attr('class','linked');
    project.append('div').attr('class','title').append('div').attr('class','text-box').text(row[0]);
    project.append('div').attr('class','date').append('div').attr('class','text-box').text(row[1]);
    // project.append('p').attr('class','org').text('for '+row[2]);
    var overlay = link.append('div').attr('class','project-overlay');
    var image = overlay.append('div').attr('class', 'image project ls');
    image.append('img').attr('src','/src/images/'+ row[4]).attr('class', 'image-size');
});
  }

