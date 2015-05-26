"use strict"; 

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server; var http = require('http');
var path = require("path"); var fs = require("fs"); import url = require("url");


import httpserver = require('./httpserver');



import websocetserverclass = require("./websocetserver");
var websocetserver = websocetserverclass.websocetserverinstance;

/** HTTP server */
http.createServer(httpserver.respond).listen(parseInt("8080", 10));

/** HTTP server 4 Websockets */
var server = http.createServer(function (request, response) {});
server.listen(webSocketsServerPort, function () { console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);});

/** WebSocket server  */
var wsServer = new webSocketServer({ httpServer: server });
//console.log((new Date()).toString() + collection);


//var clients = [];

// This callback function is called every time someone tries to connect to the WebSocket server.
wsServer.on('request', function (request) {

    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var wssi = new websocetserver();
    wssi.connection = request.accept(null, request.origin);
    

    // we need to know client index to remove them on 'close' event
    var index = websocetserverclass.clients.push(wssi.connection) - 1;

   // var prop = Object.getOwnPropertyNames(User);
    //prop.forEach((v, i, a) => { console.log((new Date()) + ' User is known as: ' + v + " - "+ i + " - "+ a); });    

    console.log((new Date()) + ' Connection accepted.');

    if (websocetserverclass.history.length > 0) { wssi.connection.sendUTF(JSON.stringify({ type: 'history', data: history })); }
    wssi.connection.on('message', wssi.HandleMessage);
    wssi.connection.on('close', function( c ){ wssi.close(c); websocetserverclass.clients.splice(index, 1);});

});





