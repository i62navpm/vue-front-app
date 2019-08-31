<template>
  <v-app-bar color="primary" app>
    <v-app-bar-nav-icon
      class="white--text"
      @click.native="toggleSidebar(!sidebarStatus)"
    />
    <router-link to="/">
      <v-toolbar-title class="white--text font-weight-medium">
        Listando<span class="orange--text">Me</span>
      </v-toolbar-title>
    </router-link>
    <v-spacer />

    <the-notification-button />
    <the-feedback-button />
  </v-app-bar>
</template>

<script>
import TheNotificationButton from './TheNotificationButton'
import TheFeedbackButton from './TheFeedbackButton'

export default {
  components: {
    TheNotificationButton,
    TheFeedbackButton,
  },
  computed: {
    sidebarStatus() {
      const { open } = this.$store.state.sidebar
      return open
    },
  },
  methods: {
    toggleSidebar(value) {
      this.$store.commit('setSidebar', value)
    },
  },
}
</script>
