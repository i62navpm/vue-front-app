<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        column 
        align-let>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in items"
            :key="i"
          >
            <div slot="header">
              <v-list 
                two-line 
                subheader>
                <v-list-tile
                  avatar
                >
                  <v-list-tile-avatar 
                    color="grey lighten-1 white--text" 
                    size="38">
                    <span class="caption">{{ item.position }}</span>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.modality | modality }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.specialty | specialty }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
            </v-list></div>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import store from '@/store'
export default {
  name: 'User',
  data() {
    return {
      items: [],
    }
  },
  async beforeRouteEnter(to, from, next) {
    let result = await store.dispatch('openSearchDialog', to.params.id)
    next(vm => (vm.items = result))
  },
}
</script>

<style lang="scss" scoped>
.v-expansion-panel__container {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
}
</style>
