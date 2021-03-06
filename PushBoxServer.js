/**
 * Created by nick on 8/23/15.
 */
//HTTP Module used for client > server connections
var http = require('http');

//Ports used by the two network interfaces
const clientPort = 3001;
const endpointPort = 3000;

//Because console.log(); gets annoying
function cl(s){console.log(s);}

//Endpoint Interface
//------------------------------------------------
//Socket IO used for server > endpoint connections
var ioEndpoint = require('socket.io').listen(endpointPort);
//Server that connects to endpoints (raspberry pi)
ioEndpoint.sockets.on('connection', function (socket) {
    cl("Endpoint Connected");
    socket.on('disconnect', function() {
        cl('Endpoint Disconnected');
    });
});
//------------------------------------------------

//Client Interface
//------------------------------------------------
function handleRequest(request, response){
    var seconds = new Date().getTime() / 1000;
    var myDate = new Date(seconds * 1000);

    console.log("Command |", request.url, "| sent at: ", myDate.toLocaleString());

    //Send data to endpoint
    ioEndpoint.emit('command', {
        cmd: request.url
    });
    //Come back here and write a meaningful response sometime
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Ok");
    response.write("\n");
    response.end();
}

//HTTP Server that can be reached by a client
var ioClient = http.createServer(handleRequest);

ioClient.listen(clientPort, function(){
    cl("Server Ready");
});
//------------------------------------------------
