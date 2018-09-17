<template>
  <v-container class="user-details">
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
          
          <v-chart-line 
            v-if="!isWorking" 
            :data="statObject"/>
            
          <v-flex v-else>
            <h3 
              class="display-3 font-weight-light">
              !Está trabajando!
            </h3>
            <v-subheader>
              Datos de la incorporación
            </v-subheader>
            <div class="incorporation-info text-xs-center">
              <v-chip
                v-for="(value, key) of items[0].working" 
                :key="key"
                label 
                color="teal" 
                text-color="white">
                <v-icon left>label</v-icon>
                <span class="incorporation-info">
                  <strong>{{ key | tableHeader }}:</strong>&nbsp;{{ value | modality }}<span/>
                </span>
              </v-chip>
            </div>
          </v-flex>
        </v-flex>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in items"
            :key="i"
            expand-icon=""
          >
            <v-flex slot="header">
              <v-user-list-status 
                :data="item" 
                :index="i"/>
            </v-flex>
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
    isWorking() {
      return this.items.some(item => item.position < 0)
    },
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

<style lang="scss">
.user-details {
  .v-expansion-panel__container {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .incorporation-info {
    font-size: 12px;
    text-transform: capitalize;
  }
}
</style>
