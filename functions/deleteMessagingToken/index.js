const admin = require('firebase-admin')

module.exports = (data, context) => {
  return admin
    .messaging()
    .unsubscribeFromTopic([data], '/topics/listandome-maestros')
    .then(response => {
      console.log('Successfully unsubscribed to topic:', response)
      return response
    })
    .catch(error => {
      console.log('Error unsubscribing to topic:', error)
      return error
    })
}
