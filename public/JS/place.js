function updatePerson() {
     
     console.log(person.destination);
     console.log(person.origin);
     console.log(person.tolat);
     console.log(person.tolong);
//var durations = String(person.duration);
//var distances = String(person.distance);
//console.log("duration"+ durations);
 $.ajax({
  method: "PUT",
  url: "/api/persons/edit/" + person.fid,
  data: {
   accessToken: person.accessToken,
   fid: person.fid,
   long: person.long,
   lat: person.lat,
   tolong : person.tolong,
   tolat : person.tolat,
   duration:person.duration,
   distance:person.distance,
   origin:person.origin,
   destination:person.destination
  }
 }).done(function(res) {
    console.log("Person location updated");
   
  console.log("Person location updated");
  console.log(res);
 }).fail(function(res) {
  console.log(res);
  console.log("Person location update failed");
 });
}

function setDestionalPlaceChanged(){
       // Search Box given place Name auto
            var to_places = new google.maps.places.Autocomplete(document.getElementById('Search-input'));
           // search box adress change this event execute
            google.maps.event.addListener(to_places, 'place_changed', function () {
      
                var to_place = to_places.getPlace();
                //group.destination = to_place;
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
             //group.tolat = Desgeometrylat;
             //group.tolong= Desgeometrylng; 
             person.tolat = Desgeometrylat;
             person.tolong = Desgeometrylng;
             
                  setDestinationMarker(); 
                  setCurrentLocation()
                  calculateDistance();
                  directionsService = new google.maps.DirectionsService();
                  directionsDisplay.setMap(map);
                  calculateRoute(directionsService, directionsDisplay);

              })
   
            });
 
}

function setCurrentLocation(){
           // find current location 
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.lat+','+pos.lng,{
         
        }).then(function(response){
            
              console.log(response);
              FromAddress = response.data.results[1].formatted_address;
              //console.log(FromAddress);
              $('#origin').val(FromAddress);
              
             console.log(FromAddress);
            
        }) ;
        
}

function setDestinationMarker(){
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
}

 
        // draw & calculate route
function calculateRoute(directionsService, directionsDisplay){
           setCurrentLocation();
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
        

function updateDestinationLocation(){
       // where to place seach information
    console.log(gid);   
  console.log(group.destination);
  $.ajax({
  method: "PUT",
  url: "/api/groups/edit/" +gid,
  data: {
   accessToken: person.accessToken,
   tolong: group.tolong,
   tolat: group.tolat,
   destination: group.destination
  }
 }).done(function(res) {
  console.log("Group location updated");
  console.log(res);
   console.log(group.destination);
 }).fail(function(res) {
  console.log(res);
  console.log("Group location update failed");
 });
 
}
