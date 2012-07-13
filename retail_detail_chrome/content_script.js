// Content Script for Retail Detail Bar
// Tim Andrianoff
// October 30, 2011	

// Define the properties of the bar.
var barHeight = "100px"
var barStyle = 'height:'+barHeight+'; background-color:#555555; width:9000px; position:fixed; z-index:2147483647; offset: 0 0 0 0;';
var body = document.body;
var shown = false;
var RDbar;

function displayBar() {
	// Create the Retail Detail Bar
	RDbar = document.createElement('div');
	RDbar.setAttribute('style',barStyle);
	RDbar.setAttribute('id','RDbar');
	
	// Make a div to offset the positioning of the body
	var spacer = document.createElement('div');
	spacer.setAttribute('style', 'height:'+barHeight);
	spacer.setAttribute('id','spacer');
	
	// Move elements of the body into a new div to contain them
	var wrapDiv = document.createElement('div');
	wrapDiv.setAttribute('id','wrap');
	while (body.firstChild) {
		wrapDiv.appendChild(body.firstChild);	
	}

	// Add the bar to the page
	body.appendChild(RDbar);
	body.appendChild(spacer);
	body.appendChild(wrapDiv);
}

function hideBar() {
	// remove the bar and the placeholder spacing div
	body.removeChild(document.getElementById('RDbar'));
	body.removeChild(document.getElementById('spacer'));
	
	// move page elements out of the wrapping div
	var temp = document.createElement('div');
	while (document.getElementById('wrap').firstChild) {
		temp.appendChild(document.getElementById('wrap').firstChild);
	}
	body.removeChild(document.getElementById('wrap'));

	// Put page elements back into the body
	while (temp.firstChild) {
		body.appendChild(temp.firstChild);
	}
	
	// TODO Don't clobber whatever used to be there.
	document.body.onmouseup = function(){};
	document.body.onmousedown= function(){};
}

var downTarget;
var upTarget;

function replaceHandlers() {
				
	// Set handlers to detect selection.
	// TODO save any replaced functions.
	document.body.onmouseup = function() {
		var selection = window.getSelection();
		var req = 
		{"type":"select",
		 "selection":selection.toString(),
		 "url":document.URL};
		 
		var callback = function(rv){
			//alert("return from selection request.\nThe selection text is:\n"
			//+ rv.selection);
			$("#RDbar").appendChild(document.createTextNode(rv.selection));
		};
		
		chrome.extension.sendRequest(req,callback);
	}
	
	// testing something about selection targets
	document.body.onmousedown = function(e) {
		if (RDbar.firstChild) {
			RDbar.removeChild(RDbar.firstChild);
		};
		RDbar.appendChild(document.createTextNode(e.target.toString()+" "+e.target.id));
		$("#"+e.target.id).draggable({ cursor: 'crosshair' });
		e.target.setAttribute("class",e.target.getAttribute("class")+" draggable");
		e.target.mouseover = function() {
			alert("i'm draggable");	
		}
	}
}

// update display of the retail detail bar
function updateBar() {
	var req = {"type": "status"};
	function callback(rv) {
		shown = rv.shownStatus;
		if (shown) {
			displayBar();	// show the bar
			replaceHandlers(); // add selection handlers
		} else {
			hideBar();
		}	
	}
	chrome.extension.sendRequest(req,callback);
}
updateBar();

function isJQueryOn() {
	var bar = $("#RDbar");
	alert("jQuery is working.");	
}
isJQueryOn();