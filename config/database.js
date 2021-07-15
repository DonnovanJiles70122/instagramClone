const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "Brianna70122",
    database: "mydb",
    waitForConnections: true,
    debug: false,

});

const promisePool = pool.promise();
module.exports = promisePool;