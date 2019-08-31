<template>
  <v-app>
    <the-toolbar />
    <the-sidebar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar'
import TheSidebar from '@/components/TheSidebar'

export default {
  name: 'App',
  components: {
    TheToolbar,
    TheSidebar,
  },
  data: () => ({
    //
  }),
}
</script>
