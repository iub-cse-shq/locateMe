 

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

function checkLogin() {
 FB.getLoginStatus(function(response) {
  if (response.status != 'connected') {
   console.log("not connected");
  }
  else {
   console.log("connected");
   $('#loginbtn').hide();
   $('#logged-in').show();
   console.log("https://graph.facebook.com/" + response.authResponse.userID + "/picture?type=normal");
   $("#pp").attr('src', "https://graph.facebook.com/" + response.authResponse.userID + "/picture?type=normal");

   person.accessToken = response.authResponse.accessToken;
   person.fid = response.authResponse.userID;

   FB.api('/me', function(response) {
    console.log('Good to see you, ' + response.name + '.');
    person.name = response.name;

    // check if person exist or create
    $.ajax({
     method: "GET",
     url: "/api/persons/" + person.fid,
    }).done(function(res) {
     console.log(res);
     person._id = res._id;
     person.groups = res.groups;
     if (person.long == 0) person.long = res.long;
     if (person.lat == 0) person.lat = res.lat;
     console.log('Person found!');
     
     JoinNewGroupbyLink();
     
     $.ajax({
      method: "PUT",
      url: "/api/persons/edit/" + person.fid,
      data: {
       accessToken: person.accessToken,
       fid: person.fid,
       long: person.long,
       lat: person.lat,
       
      }
     }).done(function(res) {
      console.log("Person location updated");
     }).fail(function(res) {
      console.log(res);
      console.log("Person location update failed");
     });

    }).fail(function(res) {
     // console.log(res.responseText);
     console.log("Person not found!");
     // failed. create person
     console.log("creating person!");
     console.log(person);

     $.ajax({
      method: "POST",
      url: "/api/persons/",
      data: person
     }).done(function(res) {
      person._id = res._id;
      person.groups = res.groups;
      console.log("Person created!");
      
     }).fail(function(res) {
      console.log(res.responseText);
     });
    });
   });

  }
 });
 
}
window.fbAsyncInit = function() {
 FB.init({
  appId: '1599683746807705',
  autoLogAppEvents: true,
  status: true,
  xfbml: true,
  version: 'v2.11'
 });

 console.log('fb ready')


 checkLogin();
 FB.Event.subscribe('auth.login', checkLogin);

 $('#loginbtn').click(function() {
  FB.login();
 });

 $('#logoutbtn').click(function() {
  FB.logout();
  alert("Log out Succesful.");
  $('#loginbtn').show();
  $('#logged-in').hide();

 });

};

(function(d, s, id) {
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) { return; }
 js = d.createElement(s);
 js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
