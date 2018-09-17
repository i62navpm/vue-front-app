<template>
  <v-toolbar
    v-scroll="handleScroll"
    color="primary"
    dark
    app
  >
    <the-dialog-people-search/>
    <v-toolbar-side-icon @click.stop="toggleSidebar(!drawer)"/>
    <router-link
      :to="'/'" 
      tag="v-toolbar-title"
      class="white--text">Listando<span class="orange--text">Me</span></router-link>

    <v-spacer/>
    
    <v-flex 
      xs6
    >
      <people-search-select 
        v-scroll="handleScrollInput" 
        class="search-toolbar"/>
    </v-flex>
    
    <v-spacer/>
    <the-feedback-button class="mx-3" />
    <the-logout-button v-if="user.email"/>
    <the-login-button v-else/>
    
  </v-toolbar>

</template>
<script>
import firebase from 'firebase/app'
import TheLoginButton from './TheLoginButton'
import TheLogoutButton from './TheLogoutButton'
import TheFeedbackButton from './TheFeedbackButton'
import PeopleSearchSelect from './PeopleSearchSelect'
import TheDialogPeopleSearch from './TheDialogPeopleSearch'

export default {
  name: 'TheToolbar',
  components: {
    TheLoginButton,
    TheLogoutButton,
    TheFeedbackButton,
    PeopleSearchSelect,
    TheDialogPeopleSearch,
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
    handleScrollInput(evt, el) {
      el.setAttribute(
        'style',
        `opacity: ${window.scrollY >= 300 && 1};
        visibility: ${window.scrollY >= 300 ? 'visible' : 'hidden'}`
      )
    },
  },
}
</script>

<style lang="scss">
.v-toolbar[data-booted='true'] {
  transition: null;
  box-shadow: rgba(0, 0, 0, 0.28) 0px -8px 8px;
  .v-toolbar__title {
    cursor: pointer;
  }
}
.search-toolbar {
  visibility: hidden;
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}
</style>
