module.exports = {
    SND_LGI: function (data, message) {
        let crypto = require('crypto');
        let parent = data.parent;
        let usr = message.usr;
        let psw = crypto.createHash('sha256').update(message.psw).digest('hex');

        this.init = function (data, message) {
            if (usr == undefined || psw == undefined) {
                console.log({ "SND_LGI": { "ERROR": "BLANK USER OR PASSWORD" } });
                parent.getSocketJs().sendMessage({ "SND_LGI": { "ERROR": "BLANK USER OR PASSWORD" } });
                //throw "BLANK USER OR PASSWORD";
            } else {
                try {
                    parent.getDb().getConn().execute("CALL prc_usr_login(?, ?, ?, ?)", [parent.getAppKey(), parent.getAddress(), usr, psw], function (err, result) {
                        if (err) {
                            console.log({ "SND_LGI": { "ERROR": err.sqlMessage } });
                            parent.getSocketJs().sendMessage({ "SND_LGI": { "ERROR": err.sqlMessage } });
                            return false;
                        }
                        if (result[0][0].app_usr_ssn_key) {
                            console.log({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                            parent.getSocketJs().sendMessage({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                            parent.setSessionKey(result[0][0].app_usr_ssn_key);
                            return false;
                        }
                    });
                } catch (err) {
                    throw err;
                }
            }
        }

        this.init(data, message);
    }
};