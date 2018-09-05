<template>
  <v-toolbar
    v-scroll="handleScroll"
    color="primary"
    dark
    app
  >
    <v-toolbar-side-icon @click.stop="toggleSidebar(!drawer)"/>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer/>
    <!-- TODO: Select tag -->
    <v-spacer/>


    <the-logout-button v-if="user.email"/>
    <the-login-button v-else/>
    
  </v-toolbar>

</template>
<script>
import firebase from 'firebase/app'
import TheLoginButton from './TheLoginButton'
import TheLogoutButton from './TheLogoutButton'

export default {
  name: 'TheToolbar',
  components: {
    TheLoginButton,
    TheLogoutButton,
  },
  directives: {
    scroll: {
      inserted(el, binding) {
        const f = evt =>
          binding.value(evt, el) && window.removeEventListener('scroll', f)

        window.addEventListener('scroll', f)
      },
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    user() {
      return this.auth.user || {}
    },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setStoreUser(user)
      } else {
        this.$store.dispatch('logout')
      }
    })
  },
  methods: {
    setStoreUser({
      displayName,
      email,
      emailVerified,
      phoneNumber,
      photoURL,
      refreshToken,
    }) {
      this.$store.commit('setAuth', {
        user: {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          refreshToken,
        },
      })
    },
    toggleSidebar(value) {
      this.$store.commit('setSidebar', value)
    },
    handleScroll(evt, el) {
      const step = 12 / 300

      el.setAttribute(
        'style',
        `box-shadow: rgba(0, 0, 0, 0.28) 0px ${
          step * window.scrollY - 8 < 4 ? step * window.scrollY - 8 : 4
        }px 8px;`
      )
    },
  },
}
</script>

<style lang="scss">
.v-toolbar[data-booted='true'] {
  transition: null;
  box-shadow: rgba(0, 0, 0, 0.28) 0px -8px 8px;
}
</style>
