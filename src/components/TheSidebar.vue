<template>
  <v-navigation-drawer
    :value="sidebarStatus"
    persistent 
    temporary
    app
    @input="toggleSidebar({open:$event})"
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon v-html="'bubble_chart'"/>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="'First option'"/>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'TheSidebar',
  data() {
    return {
      drawer: true,
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
