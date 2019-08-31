<template>
  <v-btn
    :loading="loading"
    small
    depressed
    color="primary"
    class="caption text-capitalize"
    @click.native="open"
    >Iniciar sesión</v-btn
  >
</template>
<script>
export default {
  name: 'TheLoginButton',
  computed: {
    loading() {
      return this.$store.state.auth.loading
    },
  },
  methods: {
    open() {
      this.$store.dispatch('openLoginDialog')
    },
  },
}
</script>

<style lang="scss"></style>
