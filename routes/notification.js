const router = require('express').Router()
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()

const makeNotification = async (type, email) => {
  const message = `<html>
    <body>
      <h1>New ${type}</h1>
      <p>A new ${type} has been added. Please visit website to check it</p>      
    </body>
  </html>`
  const MAKE_NOTIFICATION = `insert into notification (type, message, email) values ('${type}', '${message}', '${email}')`
  mysql.query(MAKE_NOTIFICATION, (err, res) => {
    if(err){
      return false
    }
    return true
  })
}

module.exports = makeNotification