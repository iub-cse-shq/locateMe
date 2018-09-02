'use strict';
/**
 * Module dependencies.
 */
var config = require('./config/config.js');
var mongoose = require ('mongoose');
var express = require ('express');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */



var uri = config.db.uri;
mongoose.Promise = require('q').Promise;
var db = mongoose.connect(uri,function(){
	require('./seeds.js');
});

// Init the express application
var app = require('./express.js')(db);

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Bootstrap passport config
require('./passport')();



http.listen(process.env.PORT, function(){
	console.log('Server running');
});



io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});



