<template>
  <div class="spinner-block">

    <v-layout 
      align-center 
      justify-center 
      row 
      fill-height>
      <v-flex 
        xs12 
        class="text-xs-center">

        <google/>  
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import { Google } from 'vue-loading-spinner'

export default {
  name: 'TheSpinner',
  components: {
    Google,
  },
}
</script>

<style lang="scss" scoped>
.spinner-block {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30em;
}
</style>
