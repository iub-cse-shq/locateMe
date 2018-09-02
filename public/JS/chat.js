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
        name: person.name
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
    output.innerHTML += '<h3><strong>' + data.name + ': </strong>' + data.message + '</h3>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});