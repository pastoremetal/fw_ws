const mysql = require('mysql2');
function DB() {
    let host = "localhost";
    let user = "root";
    let pass = "1478963";
    let database = "fw_ws";
    //let socketPath = "";
    let con = null;
    let connect = function () {
        con = mysql.createConnection({ host: host, user: user, password: pass, database: database });
        con.connect(function (err) {if (err) throw err;});
    }
    this.getConn = function () {
        if (con === null)
            connect();
        return con;
    }
}
module.exports = DB;

