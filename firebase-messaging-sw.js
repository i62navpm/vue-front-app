/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js')

const { messagingSenderId } = require('./config/firebase')

firebase.initializeApp({ messagingSenderId })

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function({ data }) {
  const { title, ...rest } = data
  return self.registration.showNotification(title, rest)
})

self.addEventListener('notificationclick', function(event) {
  const { title, body, icon } = event.notification
  messaging.sendMessageToWindowClients_({
    data: { title, body, icon },
  })
  event.notification.close()
  event.waitUntil(self.clients.openWindow(event.notification.data))
})
