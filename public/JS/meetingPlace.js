
function setDestinationLocation(){
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
