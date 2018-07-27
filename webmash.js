/* 
Last Name: Auvula
First Name : Anvesh Reddy
UTA ID : 1001363657
Project Name : Web Mashup
Project Number : 2
Due Date : Wednesday, October 26, 2016. 11:59 PM
*/
// Put your zillow.com API key here

var username = "anveshxp1";
var request = new XMLHttpRequest();
var marker;
var infowindow;
var content="";
//initMap() which initiates map to a location
function initMap() {
	infowindow = new google.maps.InfoWindow;
	var geocoder = new google.maps.Geocoder;
  var coordinates = {lat: 32.75, lng: -97.13};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: coordinates
  });
  marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });
  map.addListener('click', function(event) {
    content="";
    reversegeocode(event.latLng, map,geocoder);
  });
	//Initialize a mouse click event on map which then calls reversegeocode function
}

// Reserse Geocoding 
function reversegeocode(latLng, map,geocoder) {
  marker.setMap(null);
	marker = new google.maps.Marker({
   	position: latLng,
   	map: map,
  });
 	geocoder.geocode({'location': latLng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
       	content=content+results[1].formatted_address+".";
        document.getElementById("details").value = document.getElementById("details").value + "\n" +results[1].formatted_address+".";
       	console.log("results:"+results[1].formatted_address);
        sendRequest ();
			} 
      else {
        window.alert('No results found');
      }
    } 
    else {
      document.getElementById("details").value = document.getElementById("details").value + "\nNo address found.";
      sendRequest ();
    }
  }        
	);
}
// end of geocodeLatLng()

function displayResult () {
  if (request.readyState == 4 ) {
    var xml = request.responseXML.documentElement;
    var temperature = xml.getElementsByTagName("temperature");
    var windSpeed = xml.getElementsByTagName("windSpeed");
    var clouds = xml.getElementsByTagName("clouds");
    console.log("wind:"+windSpeed[0].childNodes[0].nodeValue);
	  document.getElementById("details").value = document.getElementById("details").value  +  
	    " Temperature:"+temperature[0].childNodes[0].nodeValue+
	    " Windspeed:"+windSpeed[0].childNodes[0].nodeValue+
		  " Clouds:"+clouds[0].childNodes[0].nodeValue;
		content=content+" Temperature:"+temperature[0].childNodes[0].nodeValue+
		  " Windspeed:"+windSpeed[0].childNodes[0].nodeValue+
		  " Clouds:"+clouds[0].childNodes[0].nodeValue;
		infowindow.setContent(content);
    infowindow.open(map, marker);
  }         
}

function sendRequest () {
  request.onreadystatechange = displayResult;
  var lat = marker.getPosition().lat();
  var lng = marker.getPosition().lng();
  request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username);
  // request.withCredentials = "true";
  request.send(null);
}
