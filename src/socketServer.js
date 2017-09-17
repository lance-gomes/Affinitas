var app = require('express')();
var socketIo = require('socket.io');

const portName = 4000;

var server = app.listen(portName, ()=> console.log('Listening on Port ' + portName));
var io = socketIo(server);
var clients =[];

// Executes a function <strong>ONLY</strong> if a user is within a reasonable distance from the sender
function sendConditionalMessage(body,callBack){
  var amountOfChatMembers = 0;
  clients.forEach(function (client) {
    // If both the latitude and longitude are within acceptable tolerance, render the message to the clients
    var acceptableLatitude = Math.abs(body.latitude - client.latitude) < 0.01;
    var acceptableLongitude = Math.abs(body.longitude - client.longitude) < 0.01;

    if(acceptableLongitude && acceptableLatitude) {
      amountOfChatMembers++;
      callBack(client.id, amountOfChatMembers);
    }
  });
}

io.on('connection',function(socket){

  // send request to obtain user location
  io.emit('locationRequest', {
    message:'messageRequest'
  });

  // listens for the location response and saves the new user
  socket.on('locationSent', function(body){
    //  Adds the current socket ID (current user connected) to the JSON body array
    body.id = socket.id;

    var isClientAlreadyPresent = false;

    // Performs a check to ensure that only one userId is added to the total client list
    if(clients.length !== 0) {
      for(var i=0; i<clients.length; i++) {
        if(body.id===clients[i].id) {
          isClientAlreadyPresent = true;
        }
        if(i===clients.length-1 && !isClientAlreadyPresent){
          clients.push(body);
        }
      }
    } else {
      clients.push(body);
    }
  });

  // remove the client once the user disconnects
  socket.on('disconnect', function(body) {
    clients.splice(clients.indexOf(socket.id), 1):
  });

  // sends messages to specific users depending on the latitude / longitude
  socket.on('messageSent', function(body) {
    sendConditionalMessage(body, function(clientId, participants){
      // Render the message sent to the server to all acceptable clients
      io.to(clientId).emit('messageReceived', {
        message: body.message,
        nickName : body.nickName,
        participants: participants
      });
    });
  });
});
