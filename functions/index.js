const functions = require('firebase-functions')
const searchPerson = require('./searchPerson')

exports.searchPerson = functions.https.onCall(searchPerson)