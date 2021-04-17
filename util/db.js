const mysql = require('mysql')

const mySqlConnection = function () {
    return mysql.createConnection({
        database: 'codeforces',
        user: 'root',
        password: 'Riyan1234@',
        host: 'localhost'
    })
}
module.exports = mySqlConnection