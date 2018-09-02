function JoinNewGroupbyLink(){
  //https://locate-me-webapp-a1522435.c9users.io/join/5b8ad92197d48b45a4ad85ca
    var url = window.location.pathname;
    console.log(url);
    var id = url.substring(url.lastIndexOf('/') + 1);
        console.log("person id : "+person._id);
        console.log("group id : "+id);
       $.ajax({
        method: "POST",
        url: "/api/groups/join/"+id,
        data: {
            accessToken: person.accessToken,
            person: person._id,
        }
    }).done(function(res){
         // alert("Group Join");
        var url= "https://locate-me-webapp-a1522435.c9users.io";
        window.location = url;
         console.log(id);
        console.log(res);
    
        // //person.groups.push(res);
       
        // console.log("Group joined!");
        // createGroupTable();
        
    }).fail(function(res){
        console.log(res);
        console.log("Group join failed!");
        $('#join-error').text("Yikes! Cant join this group. Try another.");
    }); 
    
}
 
