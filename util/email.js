const sgMail = require('@sendgrid/mail')
const ADMIN_EMAIL = 'riyandhiman10@gmail.com'
const SENDGRID_API_KEY = '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'

exports.sendEmail = async function (to, subject, htmlContent, cc) {
  // Send the email
  // https://github.com/sendgrid/sendgrid-nodejs
  sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    to: to,
    cc: cc,
    from: ADMIN_EMAIL,
    subject: subject,
    html: htmlContent
  }
  let res = await sgMail.send(msg)
  return res
}