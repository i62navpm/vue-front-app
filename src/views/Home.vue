<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        column 
        align-let>
        <article v-if="data.assignmentList">
          <h3 class="font-weight-regular home-title mb-2">Lista de asignaciones</h3>
          <h4 class="font-weight-regular home-subheading mb-4">Número de personas de la última asginación</h4>
          <v-stat-dynamic-home-card
            :data="data.assignmentList" 
            :list="'assignmentList'"
            class="mb-5"/>
        </article>
        <article v-if="data.citationList">
          <h3 class="font-weight-regular home-title mb-2">Lista de citaciones</h3>
          <h4 class="font-weight-regular home-subheading mb-4">Número de personas de la última citación</h4>
          <v-stat-dynamic-home-card
            :data="data.citationList" 
            :list="'citationList'"
            class="mb-5"/>
        </article>
        <article v-if="data.normalList">
          <h3 class="font-weight-regular home-title mb-2">Lista ordinario</h3>
          <h4 class="font-weight-regular home-subheading mb-4">Número de personas en el listado ordinario</h4>
          <v-stat-static-home-card 
            :data="data.normalList" 
            :list="'normalList'"
            class="mb-5"/>
        </article>
        <article v-if="data.bilingualList">
          <h3 class="font-weight-regular home-title mb-2">Lista bilingüe</h3>
          <h4 class="font-weight-regular home-subheading mb-4">Número de personas en el listado bilingüe</h4>
          <v-stat-static-home-card
            :data="data.bilingualList" 
            :list="'bilingualList'"
            class="mb-5"/>
        </article>
        <article v-if="data.voluntaryList">
          <h3 class="font-weight-regular home-title mb-2">Lista de voluntarios</h3>
          <h4 class="font-weight-regular home-subheading mb-4">Número de personas en el listado de voluntarios</h4>
          <v-stat-static-home-card
            :data="data.voluntaryList" 
            :list="'voluntaryList'"
            class="mb-5"/>
        </article>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import VStatStaticHomeCard from '@/components/VStatStaticHomeCard'
import VStatDynamicHomeCard from '@/components/VStatDynamicHomeCard'
export default {
  name: 'Home',
  components: {
    VStatStaticHomeCard,
    VStatDynamicHomeCard,
  },
  computed: {
    data() {
      return this.$store.state.home.data || {}
    },
  },
}
</script>

<style scoped>
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
