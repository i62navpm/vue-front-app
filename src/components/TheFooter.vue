<template>
  <v-footer
    dark
    height="auto"
  >
    <v-flex xs12>
      <v-card
        flat
        title
        class="primary white--text text-xs-center"
      >

        <v-card-text class="white--text pt-3">
          <img 
            src="@/assets/logo-google.png">
        </v-card-text>

        <v-divider/>

        <v-card-text class="white--text">
          <strong>Listando<span class="orange--text">Me</span></strong>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-footer>
</template>
<script>
export default {
  name: 'TheFooter',
}
</script>

<style lang="scss" scoped>
img {
  height: 3em;
}
</style>
