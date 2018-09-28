let admin = require('firebase-admin')
let config = require('./firebase')

admin.initializeApp(config)

module.exports = (data, context) => {
  return admin.auth().deleteUser(data.uid)
}
