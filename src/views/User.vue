<template>
  <v-container class="user-details">
    <v-slide-y-transition mode="out-in">
      <v-layout 
        align-space-around 
        justify-space-between 
        column 
        fill-height>
        <v-flex>
          <p class="person-name display-1 mb-5">{{ $route.params.id }}</p>
        </v-flex>

        <v-flex v-if="privateProfile">
          <h3 
            class="display-1 font-weight-light">
            Este perfil es privado
          </h3>
        </v-flex>
        
        <v-flex 
          v-if="items.length" 
          class="mb-5">
          <v-chart-line 
            v-if="!isWorking" 
            :chart-data="statObject"/>
            
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
        <v-flex>
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
              <v-card v-if="!isWorking">
                <v-card-text>
                  <v-chip
                    v-for="(value, key) of getUserInfo(item)" 
                    :key="key"
                    label 
                    color="teal" 
                    text-color="white">
                    <v-icon left>label</v-icon>
                    <span class="incorporation-info">
                      <strong>{{ key | tableHeader }}:</strong>&nbsp;{{ value | modality }}<span/>
                    </span>
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import store from '@/store'
import { db } from '@/plugins/firestore'
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
      privateProfile: false,
    }
  },
  computed: {
    isWorking() {
      return this.items.some(item => item.position < 0)
    },
    statObject() {
      const data = this.items.map(list => {
        return {
          labels: list.info.map(item => {
            ;[item] = Object.keys(item)
            return item
          }),
          label: `${this.$options.filters.specialty(
            list.specialty
          )} - ${this.$options.filters.modality(list.modality)}`,
          values: list.info.map(item => {
            ;[item] = Object.values(item).map(({ position }) => position + 1)
            return item
          }),
        }
      })
      const labels = new Set(
        data.reduce((acc, serie) => {
          acc.push(...serie.labels)
          return acc
        }, [])
      )
      const datasets = data.reduce((acc, serie, index) => {
        const dateIndex = [...labels].map(date =>
          serie.labels.lastIndexOf(date)
        )
        const datasets = {
          label: serie.label,
          data: dateIndex.map(date => serie.values[date]),
          backgroundColor: this.$options.filters.materialColor(index),
          borderColor: this.$options.filters.materialColor(index) + '80',
          fill: false,
        }
        acc.push(datasets)
        return acc
      }, [])
      return { datasets, labels: [...labels] }
    },
  },
  methods: {
    async checkIfPrivate(user) {
      const query = await db
        .collection('privateProfiles')
        .where('apellidosynombre', '==', user.toLowerCase().trim())
        .get()
      return !query.empty
    },
    isMyUser(user) {
      const myUser = this.$store.state.auth.myUser
        ? this.$store.state.auth.myUser.apellidosynombre
        : null
      return myUser === user
    },
    getUserInfo(user) {
      return Object.entries(user).reduce((acc, [key, value]) => {
        if (
          [
            'info',
            'count',
            'working',
            'specialty',
            'modality',
            'position',
            'apellidosynombre',
          ].includes(key)
        )
          return acc
        acc[key] = value
        return acc
      }, {})
    },
  },
  async beforeRouteUpdate(to, from, next) {
    const user = to.params.id

    if ((await this.checkIfPrivate(user)) && !this.isMyUser(user)) {
      this.privateProfile = true
    } else {
      this.privateProfile = false
      this.items = await store.dispatch('openSearchDialog', to.params.id)
    }
    next()
  },
  async beforeRouteEnter(to, from, next) {
    const user = to.params.id
    const query = await db
      .collection('privateProfiles')
      .where('apellidosynombre', '==', user.toLowerCase().trim())
      .get()
    const isPrivate = !query.empty
    const myUser = store.state.auth.myUser
      ? store.state.auth.myUser.apellidosynombre
      : null

    if (isPrivate && myUser !== user) {
      next(vm => (vm.privateProfile = true))
    } else {
      let result = await store.dispatch('openSearchDialog', to.params.id)
      next(vm => {
        vm.items = result
        vm.privateProfile = false
      })
    }
  },
}
</script>

<style lang="scss">
.user-details {
  .person-name {
    text-transform: capitalize;
  }
  .v-expansion-panel__container {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  }
  .incorporation-info {
    font-size: 12px;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-chip__content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v-chip {
    max-width: 100%;
  }
}
</style>
