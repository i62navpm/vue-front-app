<template>
  <v-menu 
    offset-y
    bottom 
    left>
    <v-avatar 
      slot="activator"
      color="red darken-4" 
      size="32">
      <span class="white--text">{{ user.displayName.charAt(0).toUpperCase() }}</span>
    </v-avatar>

    <v-list light>
      <v-list-tile
        @click="logout"
      >
        <v-list-tile-title 
          v-text="'Salir'"/>
        <v-list-tile-action>
          <v-icon 
            right 
            class="ml-3" >logout</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-menu>


</template>
<script>
export default {
  name: 'TheLogoutButton',
  computed: {
    auth() {
      return this.$store.state.auth
    },
    user() {
      return this.auth.user || {}
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style lang="scss">
.v-list__tile__action {
  min-width: auto;
}
</style>
