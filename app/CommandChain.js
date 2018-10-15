function CommandChain(inCommands, inClient, inCId) {
    let commands = inCommands;
    let client = inClient;
    let cId = inCId;

    /*this.suicide = function () {
        console.log("KILLING CHAIN " + cId);
        client.removeCommandChain(cId);
    };
    let completeTimeout = setTimeout(function () {
        this.suicide();
    }.bind(this), 30000);*/

   
    this.startChain = async function () {
        let msg = {};
        let pRet = null;
        console.log("STARTING CHAIN");
        for (let i in commands) {
            console.log("CHAINING-> " + i);
            if (client.getAppValidated() === true && i != "SND_APP_KEY") {
                pRet = await client.executeCommand(i, commands[i]);
            } else if (i == "SND_APP_KEY") {
                pRet = await client.executeCommand("VLD_APP", commands[i]);

            } else {
                msg = {};
                msg[i] = { "ERROR": "APP VALIDATION NEEDED" };
                //console.log(msg);
                pRet = client.getSocketJs().sendMessage(msg);
            }
            //console.log(typeof pRet);
            msg = Object.assign({}, msg, pRet);
            //console.log(msg);
            //console.log(pRet);
            //await console.log(pRet);
        }

        console.log(msg);
        client.getSocketJs().sendMessage(msg);
    };

 
    /*this.start = function () {
        console.log('STR');
        begin();
    }*/
    //begin();
    this.startChain();
}

module.exports = CommandChain;