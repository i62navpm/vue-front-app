<template>
  <v-app>
    <the-toolbar />
    <the-sidebar />

    <v-content :class="{ collapse: $route.name !== 'home' }">
      <the-main-people-search />
      <router-view />
    </v-content>

    <the-fab-button />
    <the-footer />
  </v-app>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import TheToolbar from '@/components/TheToolbar'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import TheMainPeopleSearch from '@/components/TheMainPeopleSearch'
import TheFabButton from '@/components/TheFabButton'

export default {
  name: 'App',
  components: {
    TheToolbar,
    TheSidebar,
    TheMainPeopleSearch,
    TheFooter,
    TheFabButton,
  },
  data() {
    return {
      snackbar: false,
    }
  },
  mounted() {
    this.snackbar = false
  },
  methods: {
    goToPrizes() {
      this.snackbar = false
      this.$router.push({ name: 'home' })
      setTimeout(() => {
        VueScrollTo.scrollTo('#pricing', 200, {
          easing: 'ease-in',
          offset: -125,
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse {
  transform: translateY(-30em);
}
</style>
