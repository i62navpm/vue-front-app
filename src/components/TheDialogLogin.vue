<template>
  <div class="text-xs-center">
    <v-dialog
      :value="dialog"
      width="500"
      @input="closeDialog"
    >
      <v-card light>
        <v-card-title
          class="headline primary white--text"
          primary-title
        >
          Entra y registrate
          <v-spacer/>
          <v-btn 
            flat 
            icon
            @click.native="closeDialog">
            
            <v-icon 
              class="white--text" 
            >
              close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <p class="subheading">Empieza a consultar las listas y tu posición en ellas</p>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <div id="firebaseui-auth-container"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script>
import { ui, uiConfig } from '@/plugins/firebaseUi'
import { db } from '@/plugins/firestore'

export default {
  name: 'TheDialogLogin',
  computed: {
    dialog() {
      return this.$store.state.loginDialog.open
    },
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
    signInSuccess(authResult) {
      const {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        refreshToken,
      } = authResult.user
      const credential = authResult.credential
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection('users').add({
          name: displayName,
          email,
          phoneNumber,
          photoURL,
        })
      }
      this.$store.dispatch('setAuth', {
        user: {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          refreshToken,
        },
        credential,
      })
      return false
    },
    signInError(error) {
      return error
    },
  },
}
</script>

<style lang="scss">
</style>
