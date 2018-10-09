module.exports = {
    GET_USR_DTA: function (data, message) {
        let parent = data.parent;
        let usr = message.usr;
        let ssnKey = message.sessionkey;
        let rt = null;

        this.init = function () {
            try {
                rt = new Promise((resolve, reject) => {
                    if (ssnKey == undefined || ssnKey == '') {
                        console.log({ "SND_LGI": { "ERROR": "BLANK SESSION KEY" } });
                        reject({ "SND_LGI": { "ERROR": "BLANK SESSION KEY" } });
                    }
                    parent.getDb().getConn().execute("CALL prc_usr_login(?, ?, ?, ?, ?)", [parent.getAppKey(), parent.getAddress(), usr, psw, cli_ip], function (err, result) {
                        if (err) {
                            reject({ "SND_LGI": { "ERROR": err.sqlMessage } });
                        }
                        else if (result[0][0].app_usr_ssn_key) {
                            parent.setSessionKey(result[0][0].app_usr_ssn_key);
                            resolve({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                        }
                    });
                });
                return rt;

            } catch (err) {
                throw err;
            }
        }
    }
};