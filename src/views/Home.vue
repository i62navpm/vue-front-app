<template>
  <v-container >
    <v-slide-y-transition mode="out-in">
      <v-layout 
        row 
        align-center>
        <section>
          <h3 class="font-weight-regular home-title mb-2">Últimos cambios en listas</h3>
          <h4 class="font-weight-regular home-subheading mb-4">Mantente informado de los cambios en todas las listas</h4>
          <stat-home-card :data="data.normalList" />
        </section>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import StatHomeCard from '@/components/StatHomeCard'
export default {
  name: 'Home',
  components: {
    StatHomeCard,
  },
  data() {
    return {}
  },
  computed: {
    data() {
      return this.$store.state.home.data || {}
    },
  },
  beforeCreate() {
    if (!this.$store.state.home.data) {
      this.$store.dispatch('setStats')
    }
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
