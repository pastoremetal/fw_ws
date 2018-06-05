'use strict';
const net = require('net'), JsonSocket = require('json-socket');
const Client = require('./Client');
const DB = require("./DB");

function Server(portIn, addressIn/*, DB*/) {
    let port = portIn || 5000;
    let address = addressIn || '127.0.0.1';
    let clients = [];
    let connection = null;
    let db = new DB();

    this.getPort = function () { return port; }
    this.getAddress = function () { return address; }
    this.getConnection = function () { return connection; }

    this.start = function (callback) {
        if (!connection === null)
            return true;

        let server = this;
        connection = net.createServer();
        connection.on('connection', (socketIn) => {
            let socket = new JsonSocket(socketIn);
            let client = new Client(socketIn, socket, db);
            console.log(`${client.getName()} connected at ${client.getConnectionTime()}.`);
            clients.push(client);

            socket.on('message', (message) => {
                client.receiveCommand(message);
                /*var result = message.a + message.b;
                socket.sendEndMessage({ result: result });*/
            });

            socket.on('close', () => {
                clients.splice(clients.indexOf(client), 1);
                console.log(`${client.getName()} disconnected.`);
            });

            socket.on("error", (err) => {
                //clients.splice(clients.indexOf(client), 1);
                socketIn.end();
                socketIn.destroy();
                console.log(`${client.getName()} abruptly disconnected.`);
            });
        });
        connection.listen(port, address);
        connection.on('listening', callback);
    }
}
module.exports = Server;