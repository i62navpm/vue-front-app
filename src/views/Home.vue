<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <div class="home-relative">
        <v-layout 
          v-if="data.normalList"
          column 
          align-left>
          <article v-if="data.normalList">
            <h3 class="font-weight-regular home-title mb-2">Listado ordinario definitivo</h3>
            <h4 class="font-weight-regular home-subheading mb-4">Número de personas en el listado ordinario</h4>
            <v-stat-static-home-card 
              :data="data.normalList" 
              :list="'normalList'"
              class="mb-5"/>
          </article>
          <article v-if="data.bilingualList">
            <h3 class="font-weight-regular home-title mb-2">Listado bilingüe definitivo</h3>
            <h4 class="font-weight-regular home-subheading mb-4">Número de personas en el listado bilingüe</h4>
            <v-stat-static-home-card
              :data="data.bilingualList" 
              :list="'bilingualList'"
              class="mb-5"/>
          </article>
          <article v-if="data.voluntaryList">
            <h3 class="font-weight-regular home-title mb-2">Listado de voluntarios definitivo</h3>
            <h4 class="font-weight-regular home-subheading mb-4">Número de personas en el listado de voluntarios</h4>
            <v-stat-static-home-card
              :data="data.voluntaryList" 
              :list="'voluntaryList'"
              class="mb-5"/>
          </article>
        </v-layout>
        <the-spinner v-else/>
      </div>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import VStatStaticHomeCard from '@/components/VStatStaticHomeCard'
import VStatDynamicHomeCard from '@/components/VStatDynamicHomeCard'
import TheSpinner from '@/components/TheSpinner'

export default {
  name: 'Home',
  components: {
    VStatStaticHomeCard,
    VStatDynamicHomeCard,
    TheSpinner,
  },
  computed: {
    data() {
      return this.$store.state.home.data || {}
    },
  },
}
</script>

<style scoped>
.home-relative {
  position: relative;
  min-height: 30em;
}
.home-title {
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
}
.home-subheading {
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  line-height: 24px;
}
</style>
