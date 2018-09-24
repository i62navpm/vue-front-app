import firebase from 'firebase/app'
import 'firebase/messaging'
let messaging = {}

try {
  messaging = firebase.messaging()
} catch (err) {
  console.info('Este navegador no soporta notificaciones push')
}

export { messaging }
