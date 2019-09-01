const admin = require('firebase-admin')

module.exports = (data) => {
  return admin.auth().deleteUser(data.uid)
}
