<template>
  <v-btn v-if="supportShare" flat icon large color="grey" @click.native="share">
    <v-icon large>share</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'VShareButtonUser',
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    supportShare() {
      return navigator.share !== undefined
    },
  },
  methods: {
    capitalize(name) {
      return name
        .split(/\s+/)
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join(' ')
    },
    share() {
      if (!this.supportShare) {
        // eslint-disable-next-line
        console.info( 'Este navegador no soporta API share')
        return
      }
      const data = {
        title: 'Maestros ListandoMe',
        text: `${this.capitalize(
          this.name
        )} quiere compartir su posición contigo:`,
        url: window.location.href,
      }
      navigator.share(data)
    },
  },
}
</script>

<style lang="scss"></style>
