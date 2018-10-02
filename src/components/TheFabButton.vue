<template>
  <v-fab-transition v-if="myUser">
    <v-btn
      :to="`/${myUser.apellidosynombre}`"
      color="error"
      fixed
      bottom
      right
      fab
    >
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script>
export default {
  name: 'TheFabButton',

  computed: {
    myUser() {
      return this.$store.state.auth.myUser
    },
  },
}
</script>

<style lang="scss">
</style>
