# PushBoxServer

## Overview
PushBox is a way to send commands between two devices over a local network or the internet. Such as a command from your phone to control your lights at home. 


![alt tag] (http://i.imgur.com/GTs0988l.png)

## Architecture

### Terms: 
* Endpoint: A device that receives commands and executes them. Such as a Raspberry Pi that controls your applicances.

* Client: Sends commands to endpoints. This can be a phone or tablet application, or a web interface. 

* Server: A means to connect clients and servers. This is not neccessary on a local network, but is needed for communication through the internet.
