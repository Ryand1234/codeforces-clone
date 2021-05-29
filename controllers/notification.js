var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const sendEmail = require('../util/email')

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
    let GET_USER_EMAILS = `select email from user where id = 1`
    mysql.query(GET_USER_EMAILS, async (err, emails)=>{
      if(err){
        return false
      }
      const onlyEmails = emails.map(em => em.email)
      let res = await sendEmail(onlyEmails, `New ${type}`, message)
      if(!res){
        return false
      }
      return true
    })
    
    return true
  })
}

module.exports = makeNotification