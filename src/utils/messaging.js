import { messaging } from '@/plugins/firebaseMessaging'

async function getMessagingToken() {
  try {
    await messaging.requestPermission()
    const token = await messaging.getToken()
    return token
  } catch (error) {
    return null
  }
}

export { getMessagingToken }
