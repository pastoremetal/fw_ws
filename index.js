#!/usr/bin/env node
'use strict';

const DB = require("./app/DB");
const Server = require('./app/Server');
const PORT = 5000;
const ADDRESS = "127.0.0.1"

var server = new Server(PORT, ADDRESS/*, DB*/);
//server.db = new DB();
server.start(() => {
    console.log(`Server started at: ${ADDRESS}:${PORT}`);
});

