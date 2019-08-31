<template>
  <v-navigation-drawer v-model="sidebarStatus" absolute temporary>
    <v-toolbar flat color="primary">
      <router-link to="/">
        <v-toolbar-title class="white--text font-weight-medium">
          Listando<span class="orange--text">Me</span>
        </v-toolbar-title>
      </router-link>
    </v-toolbar>

    <v-list nav dense>
      <v-list-item-group active-class="deep-purple--text text--accent-4">
        <v-list-item>
          <v-list-item-title>Foo</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Bar</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Fizz</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Buzz</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    sidebarStatus: {
      get: function() {
        const { open } = this.$store.state.sidebar
        return open
      },
      set: function(value) {
        this.$store.commit('setSidebar', value)
      },
    },
  },
  methods: {
    toggleSidebar({ open }) {
      this.$store.commit('setSidebar', open)
    },
  },
}
</script>
