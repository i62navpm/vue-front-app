<template>
  <v-dialog :value="dialog" width="400" @input="closeDialog">
    <v-card class="login-dialog" light>
      <v-card-title class="headline primary white--text" primary-title>
        <v-icon color="white" class="mr-2">input</v-icon>
        Entra y registrate
        <v-spacer />
        <v-btn flat icon @click.native="closeDialog">
          <v-icon class="white--text">
            close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <p class="title text-xs-center">
          Empieza a consultar las listas y tu posición en ellas
        </p>
        <div class="px-3">
          <p class="body-1 mb-2">
            <v-icon color="green">thumb_up</v-icon> Descubre tu posición en
            todas las listas
          </p>
          <p class="body-1 mb-2">
            <v-icon color="purple">lock</v-icon> Mantén la privacidad de tu
            perfil
          </p>
          <p class="body-1 mb-2">
            <v-icon color="blue">list_alt</v-icon> Consulta todos los listados
          </p>
          <p class="body-1 mb-2">
            <v-icon color="orange">email</v-icon> Recibe mails cuando tengamos
            actualizaciones
          </p>
          <p class="body-1 mb-2">
            <v-icon color="red">notifications</v-icon> Recibe notificaciones
            Push en el móvil
          </p>
        </div>
        <v-layout mb-3 align-center justify-center row fill-height>
          <div id="firebaseui-auth-container" />
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { ui, uiConfig } from '@/plugins/firebaseUi'
import { getMessagingToken } from '@/utils/messaging'
import { fb } from '@/plugins/firebaseFunctions'
import { db } from '@/plugins/firestore'

export default {
  name: 'TheDialogLogin',
  data() {
    return {
      buttonListener: () => this.$store.commit('setLoading', true),
      messagingTokenSet: fb.httpsCallable('messagingTokenSet'),
    }
  },
  computed: {
    dialog() {
      return this.$store.state.loginDialog.open
    },
  },
  beforeUpdate() {
    setTimeout(() => {
      const buttons = document.querySelectorAll(
        '#firebaseui-auth-container button'
      )
      if (buttons.length) {
        ;[...buttons].forEach(button => {
          button.removeEventListener('click', this.buttonListener, false)
          button.addEventListener('click', this.buttonListener, false)
        })
      }
    })
  },
  mounted() {
    uiConfig.callbacks = {
      signInSuccessWithAuthResult: this.signInSuccess,
      signInFailure: this.signInError,
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('closeLoginDialog')
    },
    async signInSuccess(authResult) {
      await this.saveUser(authResult)
      return false
    },
    signInError(error) {
      this.$store.commit('setLoading', false)
      return error
    },
    async saveUser(authResult) {
      const {
        displayName,
        email,
        emailVerified,
        refreshToken,
      } = authResult.user
      let emailNotifications = false
      let pushNotifications = true
      let myUser = null

      const messagingToken = await getMessagingToken()
      this.messagingTokenSet(messagingToken)

      if (authResult.additionalUserInfo.isNewUser) {
        db.collection('users').add({
          name: displayName,
          email,
          emailNotifications,
          pushNotifications,
          createdAt: new Date().toISOString(),
        })
        this.$store.dispatch('openNewUserDialog')
      } else {
        let query = await db
          .collection('users')
          .where('email', '==', email)
          .get()

        if (!query.empty) {
          const [doc] = query.docs
          const data = doc.data()
          ;({
            emailNotifications = false,
            pushNotifications = false,
            myUser = null,
          } = data)
        }
      }

      this.$store.dispatch('setAuth', {
        user: {
          displayName,
          email,
          emailVerified,
          refreshToken,
          emailNotifications,
          pushNotifications,
        },
      })
      this.$store.commit('setMessaging', { messaging: messagingToken })
      this.$store.commit('setMyUser', myUser)
      this.$store.commit('setLoading', false)
    },
  },
}
</script>

<style lang="scss">
.actions-dialog {
  overflow: hidden;
}
</style>
