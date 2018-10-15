const xmlJs = require('xml-js');
module.exports = {
    SND_INS_CHA: function (data, message) {
        let parent = data.parent;
        let usr = message.usr;
        let rt = null;

        this.init = function () {
            try {
                rt = new Promise((resolve, reject) => {
                    /*
                     * in_cha_app_usr
                     * in_cha_nme
                     * in_con_atb_lst
                    
                    console.log(in_cha_app_usr);
                    console.log(in_cha_nme);
                    console.log(in_con_atb_lst.keys);
                    /*if (usr == undefined || psw == undefined || usr == '' || psw == '') {
                        console.log({ "SND_LGI": { "ERROR": "BLANK USER OR PASSWORD" } });
                        reject({ "SND_LGI": { "ERROR": "BLANK USER OR PASSWORD" } });
                    }
                    parent.getDb().getConn().execute("CALL prc_usr_login(?, ?, ?, ?, ?)", [parent.getAppKey(), parent.getAddress(), usr, psw, cli_ip], function (err, result) {
                        if (err) {
                            reject({ "SND_LGI": { "ERROR": err.sqlMessage } });
                        }
                        else if (result[0][0].app_usr_ssn_key) {
                            parent.setSessionKey(result[0][0].app_usr_ssn_key);
                            resolve({ "SND_LGI": { "ssn_key": result[0][0].app_usr_ssn_key } });
                        }
                    });*/
                });
                return rt;

            } catch (err) {
                throw err;
            }
        }
    }
};