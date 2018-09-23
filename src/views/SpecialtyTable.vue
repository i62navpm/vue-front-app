<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        align-space-around 
        justify-space-between 
        column 
        fill-height>

        <v-flex xs12>
          <p class="display-1">{{ $route.params.modality | modality }}</p>
          <p class="headline">{{ $route.params.specialty | specialty }}</p>
        </v-flex>
        <v-container 
          fluid 
          grid-list-md>
          <v-layout 
            row 
            wrap>
            <v-flex 
              d-flex 
              xs12>
              <v-layout 
                row 
                wrap>
                <v-flex>
                  <v-layout 
                    row 
                    wrap>
                    <v-flex
                      d-flex
                      xs12
                      sm6
                    >
                      <v-card
                      >
                        <v-card-title 
                          class="title" 
                          primary-title>
                          Número de personas
                        </v-card-title>
                        <v-card-text class="headline green--text text-xs-right"># {{ totalItems }}</v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex
                      d-flex
                      xs12
                      sm6
                    >
                      <v-card
                      >
                        <v-card-title 
                          primary-title 
                          class="pb-1">
                          <div class="title">Último movimiento</div>

                        </v-card-title>
                        <v-card-text 
                          class="caption pt-0">
                          <p 
                            v-if="lastEvent.list"
                            class="mb-0" 
                            xs12 >{{ lastEvent.list | modality }}</p>
                          <p 
                            v-else
                            class="mb-0" 
                            xs12>{{ 'No ha habido movimiento' }}</p>
                          <div class="text-xs-right">

                            <v-user-list-status-trending 
                              :trending="lastEvent.outputs || (lastEvent.inputs * -1)"
                            />
                          </div>
                        </v-card-text>
                      </v-card>
                      
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex 
              :class="{'show-stats': stats}" 
              xs12
              class="block-stats"
            >
              <div>
                <v-card-title 
                  class="title text-xs-center text-sm-left" 
                  primary-title>
                  Evolución de entradas y salidas
                </v-card-title>
                <v-card-text>
                  <v-chart-cumulative 
                    v-if="stats"
                    :chart-data="stats"/>
                  <p v-else>No ha habido movmientos</p>
                </v-card-text>
              </div>
            </v-flex>
            
          </v-layout>
        </v-container>

        <v-card>
          <v-card-title>
            <h4 class="title">Listado de interinos</h4>
            <v-spacer/>
            <v-text-field
              v-model="search"
              disable-initial-sort
              append-icon="search"
              label="Busca por apellidos, nombre"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :pagination.sync="pagination"
            :items="opponents"
            :total-items="totalItems"
            :loading="loading"
          >
            <template 
              slot="items" 
              slot-scope="props">
              <td 
                v-for="(item, key) in props.item" 
                :key="key">
                <router-link 
                  v-if="key === indexName"
                  :to="`/${item}`" 
                  tag="a">{{ item }}</router-link>
                <span v-else>{{ item }}</span>
              </td>
            </template>
            <v-alert 
              v-if="search" 
              slot="no-results"
              :value="true"
              color="error" 
              icon="warning">
              No hay coincidencias para: "{{ search }}".
            </v-alert>
          </v-data-table>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { db } from '@/plugins/firestore'
import debounce from 'lodash.debounce'
import VChartCumulative from '@/components/VChartCumulative'
import VUserListStatusTrending from '@/components/VUserListStatusTrending'

export default {
  name: 'SpecialtyTable',
  components: { VChartCumulative, VUserListStatusTrending },
  data() {
    return {
      search: '',
      lastEvent: {},
      stats: null,
      chartData: {},
      indexName: 0,
      loading: false,
      pagination: {
        sortBy: 'count',
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      headers: [],
      opponents: [],
    }
  },
  computed: {
    totalItems() {
      const result = this.$store.state.home.data
      if (!result) return
      return (
        result[this.$store.state.route.params.modality][
          this.$store.state.route.params.specialty
        ].total + 1
      )
    },
  },
  watch: {
    search: debounce(async function(value) {
      if (!value || value.length < 3) return
      this.isLoading = true
      try {
        this.loading = true
        const opponentRef = db
          .collection(`${this.$store.state.route.path}/opponents`)
          .where('apellidosynombre', '>=', this.search.trim())
          .orderBy('apellidosynombre')
          .limit(this.pagination.rowsPerPage)
        const querySnapshot = await opponentRef.get()

        const opponents = querySnapshot.docs.map(doc => doc.data())

        if (!opponents.length) return

        this.headers = this.getHeaders(opponents)
        this.opponents = this.cleanOpponents(opponents)
      } catch (err) {
        this.headers = []
        this.opponents = []
      } finally {
        this.loading = false
      }
    }, 2000),
    pagination: {
      handler() {
        this.getAsyncOpponents()
      },
      deep: true,
    },
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getAsyncOpponents()
  },
  methods: {
    async getEvents() {
      let eventsRef = await db.collection(`${this.$route.fullPath}/events`)
      const querySnapshot = await eventsRef.get()

      if (querySnapshot.empty) return {}
      this.lastEvent = querySnapshot.docs[querySnapshot.docs.length - 1].data()

      let stats = querySnapshot.docs
        .map(doc => {
          let date = new Date(doc.id)
          date = date.toLocaleDateString()
          const data = doc.data()
          return { ...data, date }
        })
        .reduce((acc, curr) => {
          acc[curr.list] = acc[curr.list]
            ? [
                ...acc[curr.list],
                { data: curr.inputs - curr.outputs, date: curr.date },
              ]
            : [{ data: curr.inputs - curr.outputs, date: curr.date }]
          return acc
        }, {})

      return {
        stats,
      }
    },
    getStats(data) {
      if (!data.stats) return
      const [...labels] = Object.entries(data.stats).reduce(
        (acc, [, value]) => {
          value.forEach(({ date }) => {
            acc.add(date)
          })
          return acc
        },
        new Set()
      )

      const datasets = Object.entries(data.stats).reduce(
        (acc, [key, value], index) => {
          let data = labels.map(
            date =>
              value.reduce(
                (acc, curr) => (curr.date === date ? acc + curr.data : acc),
                0
              ),
            {}
          )
          const color = this.$options.filters.materialColor(index)
          acc.push({
            label: this.$options.filters.modality(key),
            data: data.map(item => Math.abs(item)),
            backgroundColor: color,
            borderColor: color + '80',
            fill: false,
          })
          return acc
        },
        []
      )

      const valuesAcc = labels.reduce((acc, curr, index) => {
        acc.push(
          datasets.reduce((acc, curr) => {
            acc = acc + curr.data[index]
            return acc
          }, 0)
        )
        return acc
      }, [])
      valuesAcc.reduce((acc, curr, index) => {
        let sum = acc - curr
        valuesAcc[index] = sum
        return sum
      }, this.totalItems)

      const color = this.$options.filters.materialColor(valuesAcc.length)

      datasets.push({
        label: 'Número total de opositores',
        type: 'line',
        pointHoverBackgroundColor: color,
        backgroundColor: color + '1a',
        borderColor: color + '80',
        data: valuesAcc,
        fill: true,
      })
      return { labels, datasets }
    },
    cleanOpponents(opponents) {
      return opponents.map(opponent =>
        this.headers.reduce((acc, curr, index) => {
          if (curr.value === 'apellidosynombre') this.indexName = index
          acc.push(opponent[curr.value] || '-')
          return acc
        }, [])
      )
    },
    getHeaders(row) {
      let headers = [
        ...row.reduce((acc, curr) => {
          Object.keys(curr).forEach(head => {
            if (['position', 'count', 'dni', 'orden'].includes(head)) return
            acc.add(head)
          })
          return acc
        }, new Set()),
      ]

      headers.unshift('dni')
      headers.unshift('orden')
      return headers.map(head => ({
        text: this.$options.filters.tableHeader(head),
        value: head,
      }))
    },
    async getOpponents() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination

      const opponentRef =
        page - 1
          ? db
              .collection(`${this.$store.state.route.path}/opponents`)
              .orderBy(sortBy || 'count', descending ? 'desc' : 'asc')
              .startAt((page - 1) * rowsPerPage)
              .limit(rowsPerPage)
          : db
              .collection(`${this.$store.state.route.path}/opponents`)
              .orderBy(sortBy || 'count', descending ? 'desc' : 'asc')
              .limit(rowsPerPage)

      const querySnapshot = await opponentRef.get()

      return querySnapshot.docs.map(doc => doc.data())
    },
    async getAsyncOpponents() {
      try {
        this.loading = true
        this.search = ''
        let opponents = await this.getOpponents()

        if (!opponents.length) return

        this.headers = this.getHeaders(opponents)
        this.opponents = this.cleanOpponents(opponents)
        this.stats = this.getStats(await this.getEvents())
      } catch (err) {
        this.headers = []
        this.opponents = []
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
td {
  text-transform: capitalize;
  a {
    text-decoration: none;
  }
}

.block-stats {
  height: 0;
  transition: all 0.2s linear;
  &.show-stats {
    height: 500px;
  }
}
.v-datatable thead th.column {
  text-transform: capitalize;
}
</style>
