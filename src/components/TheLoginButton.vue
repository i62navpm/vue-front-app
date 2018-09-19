<template>
  <v-btn 
    small 
    depressed
    color="primary"
    class="caption text-capitalize"
    @click.native="open">Iniciar sesión</v-btn>
</template>
<script>
export default {
  name: 'TheLoginButton',

  methods: {
    open() {
      this.$store.dispatch('openLoginDialog')
    },
  },
}
</script>

<style lang="scss">
</style>
