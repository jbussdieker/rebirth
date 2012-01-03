////////////////////////////////////////////////////////////////////////////////
// Global Variables
////////////////////////////////////////////////////////////////////////////////
var curlat = 0;
var curlng = 0;
var map;
var chart;

////////////////////////////////////////////////////////////////////////////////
// Event Handlers
////////////////////////////////////////////////////////////////////////////////
function jAppInit()
{
	document.getElementById("eLocationStatus").style.background = "grey";
	navigator.geolocation.watchPosition(jPositionUpdate, jPositionError, {enableHighAccuracy:true,maximumAge:60000,timeout:10000});
	DisplayAccounts();
}

function jMenuClick(menuitem)
{
	var menuitems = menuitem.parentNode.getElementsByTagName("div");
	for (var i in menuitems)
	{
		if (menuitems[i].className == "jMenuItemActive")
			menuitems[i].className = "jMenuItem";
	}
	menuitem.className = "jMenuItemActive";
	
	try {
	eval("Display" + menuitem.innerHTML + "()");
	} catch(err) {
		alert(err);
	}
}

function jPositionUpdate(position)
{
	curlat = position.coords.latitude;
	curlng = position.coords.longitude;
	if (position.coords.accuracy > 1000)
		document.getElementById("eLocationStatus").style.background = "orange";
	else if (position.coords.accuracy > 100)
		document.getElementById("eLocationStatus").style.background = "yellow";
	else
		document.getElementById("eLocationStatus").style.background = "green";
}

function jPositionError2(error)
{
	document.getElementById("eLocationStatus").style.background = "red";
	alert("Second Position Error!");
}

function jPositionError(error)
{
	document.getElementById("eLocationStatus").style.background = "red";
	navigator.geolocation.watchPosition(jPositionUpdate, jPositionError2, {enableHighAccuracy:true,maximumAge:60000,timeout:10000});
}

function jXHR(url)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	return(xhr.responseText);		
}

////////////////////////////////////////////////////////////////////////////////
// REIMPLEMENT
////////////////////////////////////////////////////////////////////////////////
function escapeHtml(unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
////////////////////////////////////////////////////////////////////////////////
// /REIMPLEMENT
////////////////////////////////////////////////////////////////////////////////
