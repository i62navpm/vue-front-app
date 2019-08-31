const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const user = functions.config().gmail.email
const pass = functions.config().gmail.password

module.exports = data => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })
  const mailOptions = {
    from: user,
    to: user,
    subject: 'Feedback de la app de oposicion 😎 [PRIMARIA]',
    html: data.message,
  }
  return transporter.sendMail(mailOptions)
}
