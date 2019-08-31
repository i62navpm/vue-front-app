<template>
  <v-navigation-drawer
    :value="sidebarStatus"
    class="sidebar"
    persistent
    temporary
    app
    @input="toggleSidebar({ open: $event })"
  >
    <v-toolbar flat color="primary">
      <v-list>
        <v-list-tile>
          <router-link
            :to="'/'"
            tag="v-list-tile-title"
            class="title white--text"
            >Listando<span class="orange--text">Me</span></router-link
          >
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider />
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.modality"
        v-model="item.active"
        :prepend-icon="item.modality | modalityIcon"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{
              item.modality | modality
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="specialty in item.specialties"
          :key="specialty"
          @click="
            $router.push({
              name: 'specialtyTable',
              params: { modality: item.modality, specialty },
            })
          "
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ specialty | specialty }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'TheSidebar',
  computed: {
    items() {
      if (!this.$store.state.home.data) return
      return Object.entries(this.$store.state.home.data).reduce((acc, curr) => {
        const [modality, specialties] = curr
        acc.push({ modality, specialties: Object.keys(specialties) })

        return acc
      }, [])
    },
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
.sidebar {
  .title {
    cursor: pointer;
  }
}
</style>
