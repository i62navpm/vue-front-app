const admin = require('firebase-admin')
const functions = require('firebase-functions').region('europe-west2')

admin.initializeApp(require('./config/firebase'))

exports.searchPerson = functions.https.onCall( require('./searchPerson'))
exports.sendEmailFeedback = functions.https.onCall(require('./sendEmailFeedback'))
exports.removeUser = functions.https.onCall(require('./removeUser'))
exports.messagingTokenSet = functions.https.onCall(require('./messagingTokenSet'))
exports.messagingTokenDelete = functions.https.onCall(require('./messagingTokenDelete'))
exports.hasPaid = functions.https.onCall(require('./hasPaid'))
exports.getListFiles = functions.https.onCall(require('./getListFiles'))
exports.getPaginateList = functions.https.onCall(require('./queriesBigQuery').getPaginateList)
exports.getDatesList = functions.https.onCall(require('./queriesBigQuery').getDatesList)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
