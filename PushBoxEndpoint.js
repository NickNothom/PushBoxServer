/**
 * Created by nick on 8/23/15.
 */
var url = require('url');
var http = require('http');
var cp = require('child_process');

//Set up outlets [letter, GPIO Pin #]
var outlets = [];
outlets.push(['a',21]);
outlets.push(['b',20]);
outlets.push(['c',26]);
outlets.push(['d',16]);
outlets.push(['e',19]);
outlets.push(['f',13]);
outlets.push(['g',6]);
outlets.push(['h',5]);

//Because console.log(); gets annoying
function cl(s){console.log(s);}

//Remote Server Items
//------------------------------------------------
//Connect to webserver
var address = "http://nicknothom.com:3000"
var socket = require('socket.io-client')(address);

//On connection to webserver
socket.on('connect', function(){
    cl('Server Connected');
});

//On command received from webserver
socket.on('command', function (data) {
    qs = data['cmd'];
    src= "Internet";
    commit(qs,src);
    //Use this as a reference to send information back to state machine
    //socket.emit('my other event', { my: 'data' });
});
//------------------------------------------------

//Local Server Items
//------------------------------------------------
//Create local server
var localServer = http.createServer(function(request, response) {
    response.writeHead(200);

    qs = request.url;
    src = "LAN";
    commit(qs,src);

    response.end('Ok\n');
});
//------------------------------------------------

//Execute Outlet Changes
//------------------------------------------------
function commit(command, source) {
    var outletLetter; var outletGPIO; var input; var onoff

    for (var i = 0; i < 8; i++){
        outletLetter = outlets[i][0];
        outletGPIO = outlets[i][1];

        //Get the input value [1 or 0]
        input = url.parse(command,true).query[outletLetter];

        //Set the plain english on/off
        //if (input == 1){onoff=" off";}else{onoff=" on";}
        //This is neater, still need to test
        onoff = input ? "off" : "on"
        if (input != undefined) {
            //Define the command to run
            var shell = 'echo ' + input + ' > /sys/class/gpio/gpio' + outletGPIO + '/value';
            //Execute command
            cp.execSync(shell)

            //Print to Console
            cl(
                "Client on " +
                source +
                " turned outlet " +
                outletLetter.toUpperCase() +
                onoff
            );
        }
    }
}
//------------------------------------------------

//Finish loading and start server
localServer.listen(3000);
cl("Endpoint Ready!");
