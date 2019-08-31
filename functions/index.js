const functions = require('firebase-functions').region('europe-west2')
const searchPerson = require('./searchPerson')

exports.searchPerson = functions.https.onCall(searchPerson)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
