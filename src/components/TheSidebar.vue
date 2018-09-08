<template>
  <v-navigation-drawer
    :value="sidebarStatus"
    persistent 
    temporary
    app
    @input="toggleSidebar({open:$event})"
  >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Title
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider/>
    <v-list>
      <v-list-group
        v-for="item in items"
        v-model="item.active"
        :key="item.title"
        :prepend-icon="item.action"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title | modality }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          @click="$router.push('/')"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title | specialty }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'TheSidebar',
  data() {
    return {
      items: [
        {
          action: 'school',
          title: 'normalList',
          items: [
            { title: 'al-audicionylenguaje' },
            { title: 'ef-educacionfisica' },
            { title: 'ei-educacioninfantil' },
            { title: 'fi-lenguaextranjera:ingles' },
            { title: 'mu-musica' },
            { title: 'pri-primaria' },
            { title: 'pt-pedagogiaterapeutica' },
          ],
        },
        {
          action: 'language',
          title: 'bilingualList',
          items: [
            { title: '001-primaria_ingles' },
            { title: '002-educacioninfantil_ingles' },
            { title: '003-musica_ingles' },
            { title: '004-educacionfisica_ingles' },
            { title: '005-inglés_inglés' },
          ],
        },
        {
          action: 'directions_run',
          title: 'voluntaryList',
          items: [
            { title: 'al-audicionylenguaje' },
            { title: 'ef-educacionfisica' },
            { title: 'ei-educacioninfantil' },
            { title: 'fi-lenguaextranjera:ingles' },
            { title: 'mu-musica' },
            { title: 'pri-primaria' },
            { title: 'pt-pedagogiaterapeutica' },
          ],
        },
        {
          action: 'sentiment_satisfied_alt',
          title: 'assignmentList',
          items: [
            { title: 'al-audicionylenguaje' },
            { title: 'as' },
            { title: 'ef-educacionfisica' },
            { title: 'ei-educacioninfantil' },
            { title: 'fi-lenguaextranjera:ingles' },
            { title: 'mu-musica' },
            { title: 'pri-primaria' },
            { title: 'ps' },
            { title: 'pt-pedagogiaterapeutica' },
            { title: '001-primaria_ingles' },
            { title: '002-educacioninfantil_ingles' },
            { title: '003-musica_ingles' },
            { title: '004-educacionfisica_ingles' },
            { title: '005-inglés_inglés' },
          ],
        },
        {
          action: 'update',
          title: 'citationList',
          items: [
            { title: 'al-audicionylenguaje' },
            { title: 'as' },
            { title: 'ef-educacionfisica' },
            { title: 'ei-educacioninfantil' },
            { title: 'fi-lenguaextranjera:ingles' },
            { title: 'mu-musica' },
            { title: 'pri-primaria' },
            { title: 'ps' },
            { title: 'pt-pedagogiaterapeutica' },
            { title: '001-primaria_ingles' },
            { title: '002-educacioninfantil_ingles' },
            { title: '003-musica_ingles' },
            { title: '004-educacionfisica_ingles' },
            { title: '005-inglés_inglés' },
          ],
        },
      ],
    }
  },
  computed: {
    sidebarStatus() {
      const { open } = this.$store.state.sidebar
      return open
    },
  },
  methods: {
    toggleSidebar({ open }) {
      this.$store.commit('setSidebar', open)
    },
  },
}
</script>

<style lang="scss">
</style>
