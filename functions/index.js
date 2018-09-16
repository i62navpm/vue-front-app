const functions = require('firebase-functions')
const searchPerson = require('./searchPerson')
const sendEmailFeedback = require('./sendEmailFeedback')

exports.searchPerson = functions.https.onCall(searchPerson)
exports.sendEmailFeedback = functions.https.onCall(sendEmailFeedback)
