const admin = require('firebase-admin')

module.exports = (data) => {
  return admin
    .messaging()
    .subscribeToTopic([data], '/topics/listandome-maestros-2019')
    .then(response => {
      console.log('Successfully subscribed to topic:', response)
      return response
    })
    .catch(error => {
      console.log('Error subscribing to topic:', error)
      return error
    })
}
