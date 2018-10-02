<template>
  <v-app>

    <the-toolbar />
    <the-sidebar />
    
    <v-content :class="{collapse: $route.name !== 'home'}">
      <the-main-people-search/>
      <router-view/>
    </v-content>

    <the-fab-button />
    <the-footer/>
  </v-app>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
.collapse {
  transform: translateY(-30em);
}
</style>
