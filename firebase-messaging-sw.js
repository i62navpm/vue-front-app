/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js')

firebase.initializeApp({ messagingSenderId: '635428808415' })

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function({ data }) {
  const { title, ...rest } = data
  messaging.sendMessageToWindowClients_({ data, showNotification: false })
  return self.registration.showNotification(title, rest)
})

self.addEventListener('notificationclick', function(event) {
  event.notification.close()
  event.waitUntil(
    self.clients
      .matchAll({ includeUncontrolled: true, type: 'window' })
      .then(clientsArr => {
        let found = clientsArr.find(client =>
          client.url.includes(event.notification.data)
        )

        found ? found.focus() : self.clients.openWindow(event.notification.data)
      })
  )
})

self.addEventListener('fetch', function(event) {})
