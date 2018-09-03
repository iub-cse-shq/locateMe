// Make connection

var socket = io();;

function openChat(event) {
    document.getElementById("chatOverlay").style.width = "35%";
    //console.log("Overlay 1 Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "hidden";
    
    
    
}

function closeChat(event) {
    document.getElementById("chatOverlay").style.width = "0%";
    //console.log("Overlay 1 Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "visible";
}

// Query DOM
var message = document.getElementById('message'),
      //handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

//Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        user:person
    });
    console.log(message.value);
    message.value = "";
    
});


message.addEventListener('keypress', function(){
    socket.emit('typing', person.name);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    var img = "https://graph.facebook.com/"+data.user.fid+"/picture?type=small";
    output.innerHTML += '<div class="output1"><img src='+img+' class="pp"> </img>' 
    + '<h5>'+' -  '+ data.message + '</h5></div>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});