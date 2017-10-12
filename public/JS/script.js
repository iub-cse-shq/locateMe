
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //console.log(position.coords.latitude);
    lat = position.coords.latitude;
    //console.log(position.coords.longitude);
    lng = position.coords.longitude;
}

