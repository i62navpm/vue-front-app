<template>
  <v-app>

    <the-toolbar />
    <the-sidebar />
    
    <v-content :class="{collapse: $route.name !== 'home'}">
      <the-main-people-search/>
      <router-view :key="$route.fullPath"/>
    </v-content>

    <v-footer 
      app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheToolbar from './components/TheToolbar'
import TheSidebar from './components/TheSidebar'
import TheMainPeopleSearch from './components/TheMainPeopleSearch'

export default {
  name: 'App',
  components: {
    TheToolbar,
    TheSidebar,
    TheMainPeopleSearch,
  },
}
</script>

<style lang="scss" scoped>
.collapse {
  transform: translateY(-30em);
}
</style>
