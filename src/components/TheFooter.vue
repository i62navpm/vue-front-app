<template>
  <v-footer
    dark
    height="auto"
  >
    <v-flex xs12>
      <v-card
        flat
        title
        class="white text-xs-center"
      >
        <v-card-text class="white--text pt-3">
          <span class="grey--text mr-3">Powered by:</span>
          <img 
            src="@/assets/logo-google.png">
        </v-card-text>

        <v-divider/>

        <v-card-text 
          class="grey--text">
          <span class="mr-2">{{ year }}</span><strong>Listando<span class="orange--text">Me</span></strong>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-footer>
</template>
<script>
export default {
  name: 'TheFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  height: 3em;
}
</style>
