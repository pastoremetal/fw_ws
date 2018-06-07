module.exports = {
    SND_LGI: function (data, message) {
        let crypto = require('crypto');
        let parent = data.parent;
        let usr = message.usr;
        let psw = crypto.createHash('sha256').update(message.psw).digest('hex');
        let cli_ip = message.cli_ip;
        let rt = null;
        //let cli_mac = message.cli_mac;

        this.init = function (data, message) {
            if (usr == undefined || psw == undefined) {
                console.log({ "SND_LGI": { "ERROR": "BLANK USER OR PASSWORD" } });
                parent.getSocketJs().sendMessage({ "SND_LGI": { "ERROR": "BLANK USER OR PASSWORD" } });
                //throw "BLANK USER OR PASSWORD";
            } else {
                try {
                    rt = new Promise((resolve, reject) => {
                        //parent.getDb().getConn().execute("CALL prc_usr_login(?, ?, ?, ?, ?, ?)", [parent.getAppKey(), parent.getAddress(), usr, psw, cli_ip, cli_mac], function (err, result) {
                        parent.getDb().getConn().execute("CALL prc_usr_login(?, ?, ?, ?, ?)", [parent.getAppKey(), parent.getAddress(), usr, psw, cli_ip], function (err, result) {
                            //console.log(err);
                            //console.log(result);
                            if (err) {
                                //console.log({ "SND_LGI": { "ERROR": err.sqlMessage } });
                                //parent.getSocketJs().sendMessage({ "SND_LGI": { "ERROR": err.sqlMessage } });
                                reject({ "SND_LGI": { "ERROR": err.sqlMessage } });
                                //callback.call(this);
                                //return false;
                            }
                            else if (result[0][0].app_usr_ssn_key) {
                                //console.log({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                                //parent.getSocketJs().sendMessage({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                                parent.setSessionKey(result[0][0].app_usr_ssn_key);
                                resolve({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                                //callback.call(this);
                                //return false;
                            }
                        });
                    });
                    return rt;

                } catch (err) {
                    throw err;
                }
            }
        }

        //this.init(data, message);
    }
};