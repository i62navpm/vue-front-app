const functions = require('firebase-functions')
const searchPerson = require('./searchPerson')
const sendEmailFeedback = require('./sendEmailFeedback')
const setMessagingToken = require('./setMessagingToken')

exports.searchPerson = functions.https.onCall(searchPerson)
exports.sendEmailFeedback = functions.https.onCall(sendEmailFeedback)
exports.setMessagingToken = functions.https.onCall(setMessagingToken)
