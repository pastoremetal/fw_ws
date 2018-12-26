'use strict';
// const net = require('http');
const JsonSocket = require('json-socket');
const Client = require('./Client');
const DB = require("./DB");
const WebSocketServer = require('websocket').server;
const http = require('http');

function Server(portIn, addressIn/*, DB*/) {
    let port = portIn || 5000;
    let address = addressIn || '127.0.0.1';
    let clients = [];
    let connection = null;
    let db = new DB();
    let wsServer;
    let server;

    this.getPort = function () { return port; }
    this.getAddress = function () { return address; }
    this.getConnection = function () { return connection; }

    this.start = function (callback) {
        server = http.createServer((request, response) => {
            response.writeHead(404);
            response.end();
        });

        server.listen(port, function() {
            console.log('Server is listening on port ' + port);
        });

        wsServer = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        });

        // wsServer.on('connection', (socketIn) => {
        //     console.log('connected');
        // });
        
        wsServer.on('request', request => {
            connection = request.accept();
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    console.log('Received Message: ' + message.utf8Data);
                    connection.sendUTF(message.utf8Data);
                }
                else if (message.type === 'binary') {
                    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                    connection.sendBytes(message.binaryData);
                }
            });
        });

        
        
        // if (!connection === null)
        //     return true;

        // let server = this;
        // connection = net.createServer(
        //     function(request, response) {
        //         response.writeHead(404);
        //         response.end();
        //     }
        // );
        
        // wsServer = new WebSocketServer({
        //     httpServer: connection,
        //     autoAcceptConnections: true
        // });

        // wsServer.on('connection', (socketIn) => {
        //     let socket = new JsonSocket(socketIn);
        //     let client = new Client(socketIn, socket, db);
        //     console.log(`${client.getName()} connected at ${client.getConnectionTime()}.`);
        //     clients.push(client);

        //     socket.on('message', (message) => {
        //         client.receiveCommand(message);
        //         /*var result = message.a + message.b;
        //         socket.sendEndMessage({ result: result });*/
        //     });

        //     socket.on('close', () => {
        //         clients.splice(clients.indexOf(client), 1);
        //         console.log(`${client.getName()} disconnected.`);
        //     });

        //     socket.on("error", (err) => {
        //         //clients.splice(clients.indexOf(client), 1);
        //         socketIn.end();
        //         socketIn.destroy();
        //         console.log(`${client.getName()} abruptly disconnected.`);
        //     });
        // });
        // connection.listen(port, () => {});
        // connection.on('listening', callback);
    }
}
module.exports = Server;