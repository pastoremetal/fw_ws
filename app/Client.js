const Router = require('./Router');

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

    let loginTimeout = setTimeout(function () {
        if (this.getLoginTime() === null)
            this.closeClient();
    }.bind(this), 15000);

    this.executeCommand = function (i, message) {
        try {
            let controller = router.getController(i);
            let instance = new controller[i]({parent: this}, message);
        } catch (err) {
            console.log(err);
            socketJs.sendMessage({ "ERROR": err });
        }
        


        /*try {
            let callBack = null;
            let controller = router.getController(i);
            let instance = new controller[i](message);
            switch (i) {
                case 'SND_LGI':
                    callBack = function () { loginTime = new Date(); }
            }
            if (typeof callBack == 'function')
                callBack.call(this, message);
        } catch (err) {
            console.log(err);
            socketJs.sendMessage({ "ERROR": err });
        }*/
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

    this.receiveCommand = function (message) {
        if (message != undefined && typeof message == "object")
            for (let i in message) {
                if (appValidated === true && i != "SND_APP_KEY")
                    this.executeCommand(i, message[i]);
                else if (i == "SND_APP_KEY") {
                    this.executeCommand("VLD_APP", message[i]);

                } else {
                    console.log({ i: { "ERROR": "APP VALIDATION NEEDED" } });
                    socketJs.sendMessage({ i: { "ERROR": "APP VALIDATION NEEDED" } });
                }

            }
    }
}
module.exports = Client;