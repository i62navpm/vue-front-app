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
  </v-app-bar>
</template>

<script>
import TheNotificationButton from './TheNotificationButton'

export default {
  components: {
    TheNotificationButton,
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
