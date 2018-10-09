module.exports = {
    GET_CNR: function (data, message) {
        let parent = data.parent;
        let rt = null;

        this.init = function () {
            try {
                rt = new Promise((resolve, reject) => {
                    parent.getDb().getConn().execute("CALL prc_get_cnr_lst()", [], function (err, result) {
                        if (err) {
                            reject({ "GET_CNR": { "ERROR": err.sqlMessage } });
                        }
                        else {
                            let list = JSON.parse(JSON.stringify(result[0]));

                            resolve({ "GET_CNR": { "cnr_lst": list } });
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