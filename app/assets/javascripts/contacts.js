////////////////////////////////////////////////////////////////////////////////
// Data
////////////////////////////////////////////////////////////////////////////////
function GetContactList(locaware)
{
	xhr = new XMLHttpRequest();
	//if (locaware == true)
	//	xhr.open("GET", "data/contacts.php?lat=" + curlat + "&lng=" + curlng, false);
	//else
		xhr.open("GET", "contacts.json", false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetLocations(id)
{/*
	xhr = new XMLHttpRequest();
	if (id)
		xhr.open("GET", "data/locations.php?lat=" + curlat + "&lng=" + curlng + "&id=" + id, false);
	else
		xhr.open("GET", "data/locations.php?lat=" + curlat + "&lng=" + curlng, false);
	xhr.send();*/
  return {};
	return JSON.parse(xhr.responseText);
}

function GetLocation(id)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "data/location.php?id=" + id, false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}

function GetContact(id)
{
	xhr = new XMLHttpRequest();
	xhr.open("GET", "contacts/" + id + ".json", false);
	xhr.send();
	return JSON.parse(xhr.responseText);
}


function CreateLocation(contactid, address, phone, lat, lng)
{
	var jsondata = JSON.stringify({"contactid":contactid, "address":address, "phone":phone, "lat":lat, "lng":lng});
	var result = jXHR("data/location.php?jsondata=" + jsondata);
	if (result)
		alert(result);		
}

function DeleteLocation(id)
{
	var jsondata = JSON.stringify("");
	var result = jXHR("data/location.php?id=" + id + "&jsondata=" + jsondata);
	if (result)
		alert(result);		
}

function UpdateLocation(id, address, phone, lat, lng)
{
	var jsondata = JSON.stringify({"id":id, "address":address, "phone":phone, "lat":lat, "lng":lng});
	var result = jXHR("data/location.php?jsondata=" + jsondata);
	if (result)
		alert(result);		
}

function CreateContact(caption)
{
	var jsondata = JSON.stringify({"caption":caption});
	var result = jXHR("data/contact.php?jsondata=" + jsondata);
	if (result)
		alert(result);		
}

function DeleteContact(id)
{
	var jsondata = JSON.stringify("");
	var result = jXHR("data/contact.php?id=" + id + "&jsondata=" + jsondata);
	if (result)
		alert(result);		
}

function UpdateContact(id, caption)
{
	var jsondata = JSON.stringify({"id":id, "caption":caption});
	var result = jXHR("data/contact.php?jsondata=" + jsondata);
	if (result)
		alert(result);		
}

////////////////////////////////////////////////////////////////////////////////
// Locations
////////////////////////////////////////////////////////////////////////////////
function DisplayLocations()
{
	document.getElementById("content").innerHTML = "<div class='jTable'><div id='map' style='margin:8px'></div></div>";

	var mapDiv = document.getElementById('map');
  mapDiv.setAttribute("style", "margin:8px; width: " + (window.innerWidth - 32) + "px; height: " + (window.innerHeight - 72) + "px");
	
	map = new google.maps.Map(mapDiv, {
	  center: new google.maps.LatLng(curlat, curlng),
	    zoom: 14,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    disableDefaultUI: true
	  });
	  
	infowindow = new google.maps.InfoWindow({content: '', size: new google.maps.Size(100,100)});

	locations = GetLocations();
	for (var i in locations)
	{
    var latLng = new google.maps.LatLng(locations[i].latitude, locations[i].longitude);
    mtitle = locations[i].contact + "<br>";
    mtitle += locations[i].address + "<br><a href='tel:";
    mtitle += locations[i].phone + "'>" + locations[i].phone + "</a>";
    marker = new google.maps.Marker({title: mtitle, position: latLng, map: map});
    
		google.maps.event.addListener(marker, 'click', function(event) 
		{
			infowindow.content = this.title; 
			infowindow.open(map, this);
			this.setZIndex(-1);
		});		
	}
}

function GeoCode(contactid, address)
{
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) 
		{
			var strName = prompt("Enter address", results[0].formatted_address);
			if (strName)
			{
				if (strName == results[0].formatted_address)
				{
					CreateLocation(contactid, strName, "", results[0].geometry.location.lat(), results[0].geometry.location.lng());
					DisplayContact(contactid);
				}
				else
				{
					GeoCode(contactid, strName);
				}
			}
		} else 
		{
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

function DisplayCreateLocation(contactid)
{
	var latlng = new google.maps.LatLng(curlat, curlng);
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) 
		{
			var strName = prompt("Enter address", results[0].formatted_address);
			if (strName)
			{
				if (strName == results[0].formatted_address)
				{
					CreateLocation(contactid, strName, "", results[0].geometry.location.lat(), results[0].geometry.location.lng());
					DisplayContact(contactid);
				}
				else
				{
					GeoCode(contactid, strName);
				}
			}
		} else 
		{
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

function DisplayDeleteLocation(id)
{
	if (confirm("Are you sure you want to delete " + id))
	{
		loc = GetLocation(id);
		DeleteLocation(id);
		DisplayContact(loc[0].contactid);
	}
}

////////////////////////////////////////////////////////////////////////////////
// Contacts
////////////////////////////////////////////////////////////////////////////////
var menuContact;
var lastContact;

function DisplayContacts()
{
	var contacts = GetContactList(true);
	var render = "";

	menuContact = undefined;
	lastContact = undefined;
	
	render += "<div class='button' onClick='DisplayCreateContact()'>Create</div><br><br>";

	render += "<table class='jTable'>";
	
	render += "<tr class='jTableRow'>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Contact</div></td>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Distance</div></td>";
	render += "</tr>";

	for (var i in contacts)
	{
		render += "<tr id=" + contacts[i].id + " class='jTableRow' style='cursor: pointer' onClick='DisplayContactMenu(this)'>";
		render += "<td class='jTableCell'>" + escapeHtml(contacts[i].caption) + "</td>";
		render += "<td class='jTableCell' align=right>";
		if (contacts[i].distance != parseFloat(contacts[i].distance))
			render += "&nbsp;";
		else
			render += contacts[i].distance + " mi.";
		render += "</td>";
		render += "</tr>";
	}
	
	render += "</table>";

	// Update page
	document.getElementById("content").innerHTML = render;
}

function DisplayCreateContact()
{
	var strName = prompt("Enter contact name");
	
	if (strName)
	{
		CreateContact(strName);
		DisplayContacts();
	}
}

function DisplayDeleteContact(id)
{
	if (confirm("Are you sure you want to delete " + id))
	{
		DeleteContact(id);
		DisplayContacts();
	}
}

function DisplayContactMenu(elem)
{
	// Check for existing menu
	if (menuContact)
	{
		menuContact.previousSibling.style.backgroundColor = "";
		menuContact.parentNode.removeChild(menuContact);
		menuContact = undefined;
		if (lastContact==elem)
		{
			lastContact = undefined;
			return;
		}
	}

	elem.style.backgroundColor = "#ddd";
	lastContact = elem;
	
	// New Row
	menuContact = document.createElement("tr");
	menuContact.innerHTML = "<td style='background: #ddd' align='center' colspan=3><div class='button' onClick='DisplayContact(" + elem.id + ")'>Edit</div><div style='float:right' class='button' onClick='DisplayDeleteContact(" + elem.id + ")'>Delete</div></td>";

	// Append
	if(elem.nextSibling) {
		elem.parentNode.insertBefore(menuContact, elem.nextSibling);
	} else {
		elem.parentNode.appendChild(menuContact);
	}
}

function DisplayContact(id)
{
	var contact = GetContact(id);
	var locations = GetLocations(id);
	var render = "";

	menuLocation = undefined;
	lastLocation = undefined;
	
	render += "<table class='jTable'>";
	
	render += "<tr class='jTableRow'>";
	render += "<td class='jTableCell'>Caption<br><input onchange='UpdateContact(" + id + ", this.value)' style='width:100%' type='text' value='" + contact.caption + "' /></td>";
	render += "</tr>";
	
	render += "</table>";

	render += "<br>";

	render += "<div class='button' onClick='DisplayCreateLocation(" + id + ")'>Create</div><br><br>";

	render += "<table class='jTable'>";
	
	render += "<tr class='jTableRow'>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Address</div></td>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Phone</div></td>";
	render += "<td class='jTableCell'><div class='jTableHeader'>Distance</div></td>";
	render += "</tr>";
	
	for (var i in locations)
	{
		render += "<tr id=" + locations[i].id + " class='jTableRow' style='cursor: pointer' onClick='DisplayLocationMenu(this)'>";
		render += "<td class='jTableCell'>" + locations[i].address + "</td>";
		render += "<td class='jTableCell'>" + locations[i].phone + "</td>";
		render += "<td class='jTableCell'>" + locations[i].distance + " mi.</td>";
		render += "</tr>";
	}

	render += "</table>";

	// Update page
	document.getElementById("content").innerHTML = render;
}

var menuLocation;
var lastLocation;
function DisplayLocationMenu(elem)
{
	// Check for existing menu
	if (menuLocation)
	{
		menuLocation.previousSibling.style.backgroundColor = "";
		menuLocation.parentNode.removeChild(menuLocation);
		menuLocation = undefined;
		if (lastLocation==elem)
		{
			lastLocation = undefined;
			return;
		}
	}

	elem.style.backgroundColor = "#ddd";
	lastLocation = elem;
	
	// New Row
	menuLocation = document.createElement("tr");
	menuLocation.innerHTML = "<td style='background: #ddd' align='center' colspan=3><div class='button' onClick='DisplayLocation(" + elem.id + ")'>Edit</div><div style='float:right' class='button' onClick='DisplayDeleteLocation(" + elem.id + ")'>Delete</div></td>";

	// Append
	if(elem.nextSibling) {
		elem.parentNode.insertBefore(menuLocation, elem.nextSibling);
	} else {
		elem.parentNode.appendChild(menuLocation);
	}
}
