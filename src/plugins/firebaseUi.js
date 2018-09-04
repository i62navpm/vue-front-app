import firebase from 'firebase/app'
import firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

const uiConfig = {
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInFlow: 'popup',
}
const ui = new firebaseui.auth.AuthUI(firebase.auth())

export { uiConfig, ui }
