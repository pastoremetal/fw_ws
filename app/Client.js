const Router = require('./Router');
const CommandChain = require('./CommandChain');

function Client(socketIn, socketInJs, database) {
    let address = socketIn.remoteAddress;
    let port = socketIn.remotePort;
    let mac = socketIn.mac;
    let name = `${address}:${port}`;
    let socket = socketIn;
    let socketJs = socketInJs;
    let connectionTime = new Date();
    let loginTime = null;
    let sessionKey = null;
    let gameKey = null;
    let router = new Router.Router();
    let appKey = null;
    let appValidated = false;
    let db = database;
    let chainCount = 0;
    let commandChains = {};
    let that = this;

    let loginTimeout = setTimeout(function () {
        if (this.getLoginTime() === null)
            this.closeClient();
    }.bind(this), 15000);

    this.executeCommand = async function (i, message) {
        let rt = null;
        try {
            let controller = router.getController(i, message, that);
            let instance = new controller[i]({ parent: that }, message);
            rt = instance.init();
            return rt;
        } catch (err) {
            //console.log(err);
            //socketJs.sendMessage({ "ERROR": err });
            return { "ERROR": err };
        }
        return true;
    }

    this.getAddress = function () { return address; }
    this.getPort = function () { return port; }
    this.getMac = function () { return mac; }
    this.getName = function () { return name; }
    this.getSocket = function () { return socket; }
    this.getConnectionTime = function () { return connectionTime; }
    this.getLoginTime = function () { return loginTime; }
    this.getSessionKey = function () { return sessionKey; }
    this.getGameKey = function () { return gameKey; }
    this.getDb = function () { return db; }
    this.getSocketJs = function () { return socketJs; }
    this.getAppKey = function () { return appKey; }
    this.getAppValidated = function () { return appValidated; }

    this.setSessionKey = function (key) { sessionKey = key; }

    this.closeClient = function () {
        socketJs.sendMessage({ "ERROR": "PRESENTATION TIMEOUT" }, () => {
            socket.end();
            socket.destroy();
        });
    }
    this.appValidate = function (key) {
        appValidated = true;
        loginTime = new Date();
        appKey = key;
    }

    this.removeCommandChain = function (cIndex) {
        delete commandChains[cIndex];
    }

    this.receiveCommand = function (message) {
        let that = this;
        console.log(message);
        if (message != undefined && typeof message == "object") {
            commandChains[chainCount] = new CommandChain(message, that, chainCount);
            //console.log('ini');
            //commandChains[chainCount].startChain();
            /*console.log("cmC");
            console.log(commandChains[chainCount]);*/
            chainCount++;
        }
            /*for (let i in message) {
                console.log(i);
                if (appValidated === true && i != "SND_APP_KEY")
                    this.executeCommand(i, message[i]);
                else if (i == "SND_APP_KEY") {
                    this.executeCommand("VLD_APP", message[i]);

                } else {
                    msg = {};
                    msg[i] = { "ERROR": "APP VALIDATION NEEDED" };
                    console.log(msg);
                    socketJs.sendMessage(msg);
                }
            }*/
    }
}
module.exports = Client;