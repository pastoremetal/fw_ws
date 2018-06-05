module.exports = {
    VLD_APP: function (data, message) {
        let parent = data.parent;
        let host = parent.getAddress();
        let appKey = message.appKey;
        let rt = null;
        this.init = function () {
            if (appKey == undefined || host == undefined) {
                console.log({ "SND_APP_KEY": { "ERROR": "CAN'T DETERMINE APP KEY OR HOST" } });
                parent.getSocketJs().sendMessage({ "SND_APP_KEY": { "ERROR": "CAN'T DETERMINE APP KEY OR HOST" } });
                //throw "CAN'T DETERMINE APP KEY OR HOST";
            } else {
                try {
                    rt = new Promise((resolve, reject) => {
                        parent.getDb().getConn().execute("SELECT fnc_vdt_app_hst_acc(?, ?) as valid", [appKey, host], function (err, result) {
                            if (err) {
                                //console.log({ "SND_APP_KEY": { "ERROR": err.sqlMessage } });
                                //parent.getSocketJs().sendMessage({ "SND_APP_KEY": { "ERROR": err.sqlMessage } });
                                reject({ "SND_APP_KEY": { "ERROR": err.sqlMessage } });
                            }
                            if (result[0].valid == 1) {
                                //console.log({ "SND_APP_KEY": { "vdt": true } });
                                //parent.getSocketJs().sendMessage({ "SND_APP_KEY": { "vdt": true } });
                                parent.appValidate(appKey);
                                resolve({ "SND_APP_KEY": { "vdt": true } });
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
        //this.init();
    }
};