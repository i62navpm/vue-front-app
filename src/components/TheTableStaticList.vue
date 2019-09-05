<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6>
              <v-card>
                <v-card-title class="title" primary-title>
                  Número de personas
                </v-card-title>
                <v-card-text class="headline green--text text-xs-right"
                  ># {{ totalItems }}</v-card-text
                >
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6>
              <v-card>
                <v-card-title class="title" primary-title>
                  Número de personas
                </v-card-title>
                <v-card-text class="headline green--text text-xs-right"
                  ># {{ totalItems }}</v-card-text
                >
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card>
      <v-card-title>
        <h4 class="title">Listado de interinos</h4>
        <v-spacer />
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
        <template slot="items" slot-scope="props">
          <td v-for="(item, key) in props.item" :key="key">
            <router-link
              v-if="key === indexName"
              :to="`/${item}/${props.item[key - 1]}`"
              tag="a"
              >{{ item }}</router-link
            >
            <span v-else>{{ item }}</span>
          </td>
        </template>
        <v-alert
          v-if="search"
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >
          No hay coincidencias para: "{{ search }}".
        </v-alert>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { captureException } from '@sentry/browser'
import { fb } from '@/plugins/firebaseFunctions'
import debounce from 'lodash.debounce'
const getPaginateList = fb.httpsCallable('getPaginateList')

export default {
  name: 'TheTableStaticList',
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getAsyncOpponents())
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.pagination.page = 1
    this.getAsyncOpponents()
  },
  data() {
    return {
      totalItems: 20,
      indexName: 2,
      search: '',
      loading: false,
      pagination: {
        sortBy: 'orden',
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      headers: [],
      opponents: [],
    }
  },
  watch: {
    search: debounce(async function() {
      this.pagination.page = 1
      this.getAsyncOpponents()
    }, 2000),
    ['pagination.sortBy']: { handler: 'getAsyncOpponents' },
    ['pagination.descending']: { handler: 'getAsyncOpponents' },
    ['pagination.page']: { handler: 'getAsyncOpponents' },
    ['pagination.rowsPerPage']: { handler: 'getAsyncOpponents' },
  },
  methods: {
    async getAsyncOpponents() {
      try {
        this.loading = true
        const { modality: datasetId, specialty: tableId } = this.$route.params

        const options = {
          datasetId,
          tableId,
          config: {
            paginate: {
              page: this.pagination.page - 1,
              limit: this.pagination.rowsPerPage,
            },
            filter: { name: this.search.toLowerCase().trim() },
            sort: this.pagination.sortBy || 'orden',
            order: this.pagination.descending ? 'DESC' : 'ASC',
          },
        }

        const { data: [rows] = [] } = await getPaginateList(options)
        this.headers = this.getHeaders(rows)
        this.opponents = this.getOpponents(rows)
      } catch (err) {
        captureException(err)
        this.headers = []
        this.opponents = []
      } finally {
        this.loading = false
      }
    },
    getHeaders(data) {
      const [row = {}] = data || []

      return Object.keys(row).map(row => ({
        text: this.$options.filters.tableHeader(row),
        value: row,
      }))
    },
    getOpponents(data) {
      return data.map(row =>
        Object.values(row).map(value => {
          if (typeof value === 'boolean') {
            value = value ? 'Sí' : 'No'
          }
          return value
        })
      )
    },
  },
}
</script>
