const mysql = require('mysql')

const mySqlConnection = function () {
    return mysql.createConnection({
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    })
}
module.exports = mySqlConnection