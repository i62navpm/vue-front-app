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
        :key="item.list"
        v-model="item.active"
        :prepend-icon="item.list | modalityIcon"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.list | modality }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="{ id, description } in item.specialties"
          :key="id"
          @click="
            $router.push({
              path: `/list/${item.list}/${id}`,
            })
          "
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ description }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { specialtyCodes } from '@i62navpm/specialty-codes'
export default {
  name: 'TheSidebar',
  data() {
    return {
      items: [
        {
          list: 'normalList',
          specialties: specialtyCodes.primary.normalSpecialties,
        },
        {
          list: 'bilingualList',
          specialties: specialtyCodes.primary.bilingualSpecialties,
        },
        {
          list: 'voluntaryList',
          specialties: specialtyCodes.primary.normalSpecialties,
        },
        {
          list: 'assignmentList',
          specialties: [
            ...specialtyCodes.primary.bilingualSpecialties,
            ...specialtyCodes.primary.normalSpecialties,
          ],
        },
        {
          list: 'citationList',
          specialties: [
            ...specialtyCodes.primary.bilingualSpecialties,
            ...specialtyCodes.primary.normalSpecialties,
          ],
        },
        {
          list: 'citationVoluntaryList',
          specialties: specialtyCodes.primary.normalSpecialties,
        },
        {
          list: 'incorporateList',
          specialties: [
            ...specialtyCodes.primary.bilingualSpecialties,
            ...specialtyCodes.primary.normalSpecialties,
          ],
        },
        {
          list: 'nextCitationList',
          specialties: [
            ...specialtyCodes.primary.bilingualSpecialties,
            ...specialtyCodes.primary.normalSpecialties,
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
.sidebar {
  .title {
    cursor: pointer;
  }
}
</style>
