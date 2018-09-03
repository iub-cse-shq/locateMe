/* global initmap() */
/* global SetMarkerAndLocation() */
/* global group.tolat  */
/* global group.tolong*/
/* global group.destination */
 
var map, infoWindow,infoWindowTo,infoWindow2, infoWindow3,destinationAdresss,FromAddress,originAddress,to_address,origin,destination,directionsService,directionsDisplay,distance_in_kilo,distance_in_mile,duration_text;
var pos, pos2, pos3,dpos;
var marker, marker2, marker3,destinationmarker;
var infowindowRoute ;
 var Desgeometrylat ;
 var Desgeometrylng;
var image = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
var image2 = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
var image3 = 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';

var contentString = "You Are Here";
var contentString2 = "SomePlace";
var contentString3 = "Another Place";

//default Values
pos = {
    lat: 23.8094873,
    lng: 90.4288114
};

pos2 = {
    lat: 23.8086454,
    lng: 90.4295963
};

pos3 = {
    lat: 23.809042,
    lng: 90.4274495
};
//
//Funtion defination of Setting postion for markers with pos2 and pos3
function setPostionManually(latValue, lngValue, positionVariale) {
    positionVariale.lat = latValue;
    positionVariale.lng = lngValue;
}
//Function for checking if infoWindows is open or not
function isInfoWindowOpen(infoWindow){
    var TempMap = infoWindow.getMap();
    return (TempMap !== null && typeof TempMap !== "undefined");
}


//Setting Postion of other 2 markers manually
setPostionManually(23.809398, 90.430728, pos2);
setPostionManually(23.809713, 90.430695, pos3);

//initialize maps
function initMap() {
 
directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setOptions({
  polylineOptions: {
    strokeColor: '#4285F4'
   
  }
});

 

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 23.9632, lng: 87.5399 },
        zoom: 6
    });

    //infoWindow = new google.maps.InfoWindow;
    infoWindow = new google.maps.InfoWindow({
    content: contentString
    });
    
     infoWindowTo = new google.maps.InfoWindow({
    content: contentString
    });
    
    //infoWindow2 = new google.maps.InfoWindow;
    infoWindow2 = new google.maps.InfoWindow({
    content: contentString2
    });
    //infoWindow3 = new google.maps.InfoWindow;
    infoWindow3 = new google.maps.InfoWindow({
    content: contentString3
    });
    
    infowindowRoute = new google.maps.InfoWindow();
    
    //var searchBox = new google.maps.places.Autocomplete(document.getElementById('Search-input'));
     //setDestionalPlaceChanged();
    
  
    
}

function SetMarkerAndLocation()
{
        // Try HTML5 geolocation.

        if (navigator.geolocation) {
            //realTime Track Current location
            var optn ={
                enableHighAccuracy :true,
                timeout : Infinity,
                maximumAge:0
            }
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude 
            };
            
           person.long = pos.lng;
           person.lat = pos.lat;
           
   setDestionalPlaceChanged();
       
            //console.log("i am here"+person.dlat)
           
            //infoWindow.setPosition(pos);
    
            //infoWindow.setContent("Your Position");
            //infoWindow2.setContent("Some Message");
            //infoWindow3.setContent("another Message");
            //infoWindow.open(map);
    
            //initializing Markers with postions
            
            
            
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'You Are Here!',
                animation: google.maps.Animation.DROP,
                icon: image
            });
    
            var marker2 = new google.maps.Marker({
                position: pos2,
                map: map,
                title: 'SomePlace!',
                animation: google.maps.Animation.DROP,
                icon: image2
            });
    
            var marker3 = new google.maps.Marker({
                position: pos3,
                map: map,
                title: 'Another Place!',
                animation: google.maps.Animation.DROP,
                icon: image3
            });
    
            //map.panTo(pos);
            setTimeout("map.setZoom(16)",Infinity);
            
            //showing 'Your Location' message early on
            infoWindow.open(map, marker);
            
    
            //Setting On Click functions to marker for pop information
            marker.addListener('click', function() {
                toggleBounce();
                //infoWindow.open(map, marker);
                if (isInfoWindowOpen(infoWindow)){
                    // do something if it is open
                } else {
                    // do something if it is closed
                    infoWindow.open(map, marker);
                }
            });
           
            marker2.addListener('click', function() {
                toggleBounce2();
                
                if (isInfoWindowOpen(infoWindow2)){
                    // do something if it is open
                } else {
                    // do something if it is closed
                    infoWindow2.open(map, marker2);
                }
            });
    
            marker3.addListener('click', function() {
                toggleBounce3();
                if (isInfoWindowOpen(infoWindow3)){
                    // do something if it is open
                } else {
                    // do something if it is closed
                    infoWindow3.open(map, marker3);
                }
            });
    
    
            //Adding Animations to markers for bounce
            
            
            
            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                }
                else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
    
            }
            
             
    
            function toggleBounce2() {
                if (marker2.getAnimation() !== null) {
                    marker2.setAnimation(null);
                }
                else {
                    marker2.setAnimation(google.maps.Animation.BOUNCE);
                }
    
            }
    
            function toggleBounce3() {
                if (marker3.getAnimation() !== null) {
                    marker3.setAnimation(null);
                }
                else {
                    marker3.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
    
            map.setCenter(pos);
            
            //Adding Dom Listener to resize map with browser window
    
            google.maps.event.addDomListener(window, 'resize', function() {
                map.setCenter(pos);
            });
    
    
    
        },function(){
            handleLocationError(true, infoWindow, map.getCenter());
            handleLocationError(true, infoWindow2, pos2);
            handleLocationError(true, infoWindow3, pos3);
        });
    }
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
        
}

SetMarkerAndLocation();

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function lockGPS(event)
{
    initMap();
    SetMarkerAndLocation();
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        
    }
    else
    {
        alert("Can't Lock GPS location! Please Reload Page.");
    }
}
function showPosition(position) {
    person.lat = position.coords.latitude;
    person.long = position.coords.longitude;
    alert("Your Location: " + person.lat + " " + person.long);
}
function showError(error) {
    alert("Error. Please reload. ");
}
