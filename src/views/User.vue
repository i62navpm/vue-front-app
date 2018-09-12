<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        align-space-around 
        justify-space-between 
        column 
        fill-height>
        <v-flex 
          v-if="items.length" 
          xs12
          class="mb-5">
          <v-chart-line :data="statObject"/>
        </v-flex>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in items"
            :key="i"
            expand-icon=""
          >
            <div slot="header">
              <v-user-list-status :data="item"/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import store from '@/store'
import VChartLine from '@/components/VChartLine'
import VUserListStatus from '@/components/VUserListStatus'

export default {
  name: 'User',
  components: {
    VChartLine,
    VUserListStatus,
  },
  data() {
    return {
      items: [],
    }
  },
  computed: {
    statObject() {
      return this.items.map(list => {
        return {
          labels: list.info.map(item => {
            ;[item] = Object.keys(item)
            return item
          }),
          label: `${this.$options.filters.specialty(
            list.specialty
          )} - ${this.$options.filters.modality(list.modality)}`,
          values: list.info.map(item => {
            ;[item] = Object.values(item).map(({ position }) => position)
            return item
          }),
        }
      })
    },
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
