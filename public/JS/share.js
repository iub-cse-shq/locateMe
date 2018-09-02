$('#shareButton').click(function(){
   var e = $('#shareLink').select();
    document.execCommand("copy");
    console.log('copied to clipboard!');
});

function createShareLink(){
    $.ajax({
        method: "POST",
        url: "/api/shares",
        data: {long: person.long, lat: person.lat}
    }).done(function(res){
        console.log(res);
        console.log("Share created!");
        $('#shareLink').val('https://locate-me-webapp-a1522435.c9users.io/shares/'+res._id);
    }).fail(function(res){
        console.log(res);
        console.log("Share failed!");
    }); 
}