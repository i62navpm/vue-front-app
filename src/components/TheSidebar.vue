<template>
  <v-navigation-drawer
    v-model="drawer"
    persistent
    temporary
    app
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
}
</script>

<style lang="scss">
</style>
