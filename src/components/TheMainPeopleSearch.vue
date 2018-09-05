<template>
  <v-container 
    class="main-block-search" 
    fluid>
    <v-layout 
      align-space-around
      justify-space-around 
      column 
      fill-height
    >
      <v-flex 
        xs6
      >
        <v-layout 
          justify-center
          row
        >
          <v-flex 
            xs12
            sm8
            md6
            lg4
            class="display-2 font-weight-regular">
            Descubre tu posición en las listas
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex 
        xs6>
        <v-layout 
          justify-center
          row
        >
          <v-flex 
            xs12
            sm8
            md6>
            <people-search-select/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import PeopleSearchSelect from './PeopleSearchSelect'

export default {
  name: 'TheMainPeopleSearch',
  components: {
    PeopleSearchSelect,
  },
}
</script>

<style lang="scss">
.main-block-search {
  height: 30em;
  color: white;
  padding-top: 5em;
  text-align: center;
  background-color: #4285f4;
}
</style>
