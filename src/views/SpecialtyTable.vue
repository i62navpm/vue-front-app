<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout 
        align-space-around 
        justify-space-between 
        column 
        fill-height>
        <v-card>
          <v-card-title>
            <h4 class="title">Listado de opositores</h4>
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

export default {
  name: 'SpecialtyTable',
  components: {},
  data() {
    return {
      search: '',
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
      path: this.$store.state.route.path,
    }
  },
  computed: {
    totalItems() {
      const result = this.$store.state.home.data
      return result[this.$store.state.route.params.modality][
        this.$store.state.route.params.specialty
      ].total
    },
  },
  watch: {
    search: debounce(async function(value) {
      if (!value || value.length < 3) return
      this.isLoading = true
      try {
        this.loading = true
        const opponentRef = db
          .collection(`${this.path}/opponents`)
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
      async handler() {
        try {
          this.loading = true
          this.search = ''
          let opponents = await this.getOpponents()

          if (!opponents.length) return

          this.headers = this.getHeaders(opponents)
          this.opponents = this.cleanOpponents(opponents)
        } catch (err) {
          this.headers = []
          this.opponents = []
        } finally {
          this.loading = false
        }
      },
      deep: true,
    },
  },
  methods: {
    cleanOpponents(opponents) {
      return opponents.map(opponent =>
        this.headers.reduce((acc, curr, index) => {
          if (curr.text === 'apellidosynombre') this.indexName = index
          acc.push(opponent[curr.text] || '-')
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
        text: head,
        value: head,
      }))
    },
    async getOpponents() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination

      const opponentRef =
        page - 1
          ? db
              .collection(`${this.path}/opponents`)
              .orderBy(sortBy || 'count', descending ? 'desc' : 'asc')
              .startAt(page * rowsPerPage)
              .limit(rowsPerPage)
          : db
              .collection(`${this.path}/opponents`)
              .orderBy(sortBy || 'count', descending ? 'desc' : 'asc')
              .limit(rowsPerPage)

      const querySnapshot = await opponentRef.get()

      return querySnapshot.docs.map(doc => doc.data())
    },
  },
}
</script>

<style lang="scss" scoped>
td {
  text-transform: capitalize;
  a {
    text-decoration: none;
  }
}
</style>
