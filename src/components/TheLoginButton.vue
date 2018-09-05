<template>
  <v-menu 
    bottom 
    left>
    <v-btn 
      slot="activator" 
      small 
      depressed
      color="primary"
      class="caption text-capitalize">Iniciar sesión</v-btn>

    <v-list light>
      <div id="firebaseui-auth-container"/>
      
    </v-list>
  </v-menu>


</template>
<script>
import { ui, uiConfig } from '@/plugins/firebaseUi'

export default {
  name: 'TheLoginButton',
  mounted() {
    uiConfig.callbacks = {
      signInSuccessWithAuthResult: this.signInSuccess,
      signInFailure: this.signInError,
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
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

      this.$store.commit('setAuth', {
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
