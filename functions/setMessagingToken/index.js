const admin = require('firebase-admin')

module.exports = (data, context) => {
  return admin
    .messaging()
    .subscribeToTopic([data], '/topics/listandome-maestros')
    .then(response => {
      console.log('Successfully subscribed to topic:', response)
      return response
    })
    .catch(error => {
      console.log('Error subscribing to topic:', error)
      return error
    })
}
