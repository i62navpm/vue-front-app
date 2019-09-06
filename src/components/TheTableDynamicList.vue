<template>
  <div>
    <v-layout justify-end>
      <v-flex xs12 sm6>
        <v-menu
          v-model="datePicker"
          :close-on-content-click="false"
          lazy
          transition="scale-transition"
          min-width="290px"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="computedDateFormatted"
              label="Escoge la fecha del listado"
              append-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            :allowed-dates="allowedDates"
            @input="onClickDatePicker"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
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
const getDatesList = fb.httpsCallable('getDatesList')

export default {
  name: 'TheTableStaticList',
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      await vm.getAsyncDates()
      vm.getAsyncOpponents()
    })
  },
  async beforeRouteUpdate(to, from, next) {
    next()
    this.pagination.page = 1
    await this.getAsyncDates()
    this.getAsyncOpponents()
  },
  data() {
    return {
      totalItems: 20,
      indexName: 2,
      datePicker: false,
      date: null,
      dates: [],
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
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
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
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    onClickDatePicker() {
      this.datePicker = false
      this.pagination.page = 1
    },
    allowedDates(val) {
      return this.dates.includes(val)
    },
    async getAsyncDates() {
      try {
        this.loading = true
        const { modality: datasetId, specialty: tableId } = this.$route.params

        const {
          data: [rows],
        } = await getDatesList({ datasetId, tableId })
        this.dates = this.getDates(rows)
        this.date = this.dates.length && this.dates[0]
      } catch (err) {
        captureException(err)
        this.headers = []
        this.opponents = []
      } finally {
        this.loading = false
      }
    },
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
            filter: { name: this.search.toLowerCase().trim(), date: this.date },
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

      return Object.keys(row)
        .map(row => ({
          text: this.$options.filters.tableHeader(row),
          value: row,
        }))
        .slice(0, -1)
    },
    getOpponents(data) {
      return data.map(row =>
        Object.values(row)
          .map(value => {
            if (typeof value === 'boolean') {
              value = value ? 'Sí' : 'No'
            }
            return value
          })
          .slice(0, -1)
      )
    },
    getDates(data) {
      return data.map(({ date = {} } = {}) => date.value)
    },
  },
}
</script>
