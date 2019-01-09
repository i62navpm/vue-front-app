<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="20000"
      vertical
      right
      auto-height
      top
    >
      <p class="headline yellow--text">
        <v-icon
          color="yellow"
          class="mr-2"
        >warning</v-icon>
        Noticia
      </p>
      <span>
        A partir del 1 de Enero de 2019 Listando<span class="orange--text">Me</span> empezará a usar un modelo de suscripción.
      </span>
      <span class="mt-2 mb-5">
        Hemos agotado el presupuesto del que disponíamos y nos hemos visto forzados a usar este modelo, era esto o cerrar Listando<span class="orange--text">Me</span>.
      </span>
      <span class="text-xs-right">
        Sentimos mucho todas las molestias 😔😔😔
      </span>
      <v-btn
        color="info"
        flat
        class="text-xs-left"
        @click="goToPrizes()"
      >
        Ver suscripción
      </v-btn>
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
    <the-toolbar />
    <the-sidebar />

    <v-content :class="{collapse: $route.name !== 'home'}">
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
