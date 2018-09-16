const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

module.exports = (data, context) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  })
  const mailOptions = {
    from: gmailEmail,
    to: gmailEmail,
    subject: 'Feedback de la app de oposicion 😎',
    html: data.message,
  }
  return transporter.sendMail(mailOptions)
}
