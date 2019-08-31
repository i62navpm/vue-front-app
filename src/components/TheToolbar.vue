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
    <v-spacer></v-spacer>
    <v-btn
      text
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>open_in_new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
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
