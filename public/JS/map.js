/* global initmap() */
/* global SetMarkerAndLocation() */
/* global group.tolat  */
/* global group.tolong*/
/* global group.destination */
var group=0;
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
           
        
            // where to place seach information
            var to_places = new google.maps.places.Autocomplete(document.getElementById('Search-input'));
           // search box adress change this event execute
            google.maps.event.addListener(to_places, 'place_changed', function () {
      
                var to_place = to_places.getPlace();
                group.destination = to_place;
                var to_address = to_place.formatted_address;
                $('#destination').val(to_address);
                 console.log(to_place);
                console.log(to_address);
                axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
                   params:{
                   address: to_address
           } 
        })
        .then(function(response){
            
            //log for response
           
             Desgeometrylat = response.data.results[0].geometry.location.lat;
             Desgeometrylng = response.data.results[0].geometry.location.lng;
             group.tolat = Desgeometrylat;
             group.tolong= Desgeometrylng; 
             person.tolat = Desgeometrylat;
             person.tolong = Desgeometrylng;
         
            
             console.log(Desgeometrylat);
             console.log(Desgeometrylng);
               dpos = {
                lat: Desgeometrylat,
                lng: Desgeometrylng 
            };
            //set Destination marker
               if (destinationmarker && destinationmarker.setMap) {
                   destinationmarker.setMap(null);
                     }  
                   destinationmarker = new google.maps.Marker({
                    position: dpos,
                    map: map,
                    title:to_address,
                    animation: google.maps.Animation.DROP,
                    icon: image3
            });
            
              })
   
            });
            
             person.tolat = Desgeometrylat;
             person.tolong = Desgeometrylng;
              
             
           
            
             //console.log(destinationAdresss);
             //console.log(pos.lat+","+pos.lng);
            
            // find current location 
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.lat+','+pos.lng,{
         
        }).then(function(response){
            
              console.log(response);
              FromAddress = response.data.results[1].formatted_address;
              //console.log(FromAddress);
              $('#origin').val(FromAddress);
              
             console.log(FromAddress);
            
        }) ;
        
        
        // draw & calculate route
        function calculateRoute(directionsService, directionsDisplay){
            person.origin = origin;
            person.destination = destination;
             
             
                 directionsDisplay.setMap(map);
              
               var request = {
                        origin: person.origin,
                        destination:person.destination,
                        travelMode: 'DRIVING'
                      };
              
               directionsService.route(request, function(response, status) {
                    if (status == 'OK') {
                        
                          directionsDisplay.setDirections(response);
                          directionsDisplay.setOptions( { suppressMarkers: true } );
                          var center_point = response.routes[0].overview_path.length/2;
                          infowindowRoute.setContent(distance_in_kilo+ " km<br>" +duration_text + " ");
                          infowindowRoute.setPosition(response.routes[0].overview_path[center_point|0]);
                          infowindowRoute.open(map);
                    }
                  });
            
        }
        
            
              
              
        
        
        function calculateDistance() {
              origin = $('#origin').val();
             destination = $('#destination').val();
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
                    // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
                    avoidHighways: false,
                    avoidTolls: false
                }, callback);
        }
        
        
        
        function callback(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                 console.log(err);
            } else {
                var origin = response.originAddresses[0];
                var destination = response.destinationAddresses[0];
                if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
                    // $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
                    console.log("better way to travel on plane");
                } else {
                    var distance = response.rows[0].elements[0].distance;
                    var duration = response.rows[0].elements[0].duration;
                    console.log(response.rows[0].elements[0].distance);
                     distance_in_kilo = distance.value/1000; // the kilom
                     distance_in_mile = distance.value/1609.34; // the mile
                     duration_text = duration.text;
                    var duration_value = duration.value;
                    console.log("duration : "+duration_text);
                    console.log("distance_in_mile : "+distance_in_kilo);
                    
                    person.duration = duration_text
                    person.distance = distance_in_kilo
                    updatePerson();
                }
            }
        }
        // print results on submit the form
         google.maps.event.addListener(to_places, 'place_changed', function () {
    
                  calculateDistance();
                  directionsService = new google.maps.DirectionsService();
                 
                  directionsDisplay.setMap(map);
                  calculateRoute(directionsService, directionsDisplay);
                    
         });
      

      
          
             
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
