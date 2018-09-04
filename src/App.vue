<template>
  <v-app>

    <the-toolbar />
    <v-content>
      <router-view/>
    </v-content>

    <v-footer 
      app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheToolbar from './components/TheToolbar'

export default {
  name: 'App',
  components: {
    TheToolbar,
  },
}
</script>
