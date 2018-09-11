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
          <line-chart :data="statObject"/>
        </v-flex>
        
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(item,i) in items"
            :key="i"
            expand-icon=""
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
                  <v-list-tile-action>
                    <v-badge 
                      :right="item.trending < 0" 
                      :left="item.trending >= 0" 
                      overlap>
                      <span slot="badge">{{ trendingAbs(item.trending) }}</span>
                      <v-tooltip 
                        v-if="item.trending > 0" 
                        bottom>
                        <span slot="activator"><v-icon
                          large
                          color="green"
                        >
                          trending_up
                        </v-icon>
                        </span>
                        <span>Estás más cerca! 🎉</span>
                      </v-tooltip>
                      <v-tooltip 
                        v-else-if="item.trending < 0" 
                        bottom>
                        <span slot="activator"><v-icon
                          large
                          color="red"
                        >
                          trending_down
                        </v-icon>
                        </span>
                        <span>Te has alejado 😭</span>
                      </v-tooltip>
                      <v-tooltip 
                        v-else 
                        bottom>
                        <span slot="activator"><v-icon
                          large
                          color="yellow darken-2"
                          class="rotate"
                        >
                          pause
                        </v-icon>
                        </span>
                        <span>Te mantienes igual 😒</span>
                      </v-tooltip>
                        
                    </v-badge>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import store from '@/store'
import LineChart from '@/components/LineChart'

export default {
  name: 'User',
  components: {
    LineChart,
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
  methods: {
    trendingAbs(trending) {
      return Math.abs(trending)
    },
  },
  async beforeRouteEnter(to, from, next) {
    function trending(item) {
      const [lastPosition = {}] = item.info.slice(-1).values()
      const [{ position = 0 } = {}] = Object.values(lastPosition)
      return position - item.position
    }

    let result = await store.dispatch('openSearchDialog', to.params.id)
    result.map(item => (item.trending = trending(item)))

    next(vm => (vm.items = result))
  },
}
</script>

<style lang="scss" scoped>
.v-expansion-panel__container {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
}
.v-icon {
  &.rotate {
    transform: rotate(90deg);
  }
}
.v-badge {
  span {
    font-size: 10px;
  }
}
.v-chip__content {
  font-size: 10px;
}
</style>
