const mysql = require('mysql2');
function DB() {
    let host = "localhost";
    let user = "root";
    let pass = "1478963";
    let database = "falling_worlds";
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
/*const Sequelize = require('sequelize');
function DB() {
    let host = "localhost";
    let user = "root";
    let pass = "1478963";
    let database = "falling_worlds";
    let con = null;
    let connect = function () {
        con = new Sequelize(database, user, pass, {
            host: host,
            dialect: 'mysql',
            operatorsAliases: false,
        }).authenticate()
            .then(() => { console.log('Connection has been established successfully.') })
            .catch(err => {
                throw err;
                console.error('Unable to connect to the database:', err);
            });
    };
    this.getConn = function () {
        if (con === null)
            connect();
        return con;
    }
}
module.exports = DB;*/