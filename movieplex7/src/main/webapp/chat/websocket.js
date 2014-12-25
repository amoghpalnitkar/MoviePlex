/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var wsUri = 'ws://' + document.location.host + document.location.pathname.substr(0,
            document.location.pathname.indexOf("/faces")) + '/websocket';

console.log(wsUri);

var websocket = new websocket(wsUri);
var textField = document.getElementById("textField");
var users = document.getElementById("users");
var chatlog = document.getElementById("chatlog");
var username;

websocket.onopen = function(evt) { onOpen(evt);};
websocket.onmessage = function(evt) { onMessage(evt);};
websocket.onclose = function(evt) { onClose(evt);};
websocket.onerror = function(evt) { onError(evt);};

var output = document.getElementById("output");

function join(){
    username = textField.value;
    websocket.send(username + " joined");
}

function send_message(){
    websocket.send(username + ": " + textField.value);
}

function onOpen(){
    writeToScreen("Connected");
}

function onClose(){
    writeToScreen("Disconnected");
}

function onMessage(evt){
    writeToScreen("Recieved : "+evt.data);
    if(evt.data.indexOf("joined") !== -1){
        users.innerHTML += evt.data.substring(0, evt.data.indexOf("\n\
        joined")) + "\n";
    } else{
        chatlog.innerHTML += evt.data + "\n";
    }
}

function onError(evt){
    writeToScreen("Error!");
}

function disconnect(){
    websocket.close();
}

function writeToScreen(message){
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}