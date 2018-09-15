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
              append-icon="search"
              label="Search"
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
                :key="key">{{ item }}</td>
            </template>
            <v-alert 
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

export default {
  name: 'SpecialtyTable',
  components: {},
  data() {
    return {
      search: '',
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
    pagination: {
      async handler() {
        try {
          this.loading = true
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
        this.headers.reduce((acc, curr) => {
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
        sortable: true,
        value: head,
      }))
    },
    async getOpponents() {
      const { sortBy, descending, page, rowsPerPage } = this.pagination

      const opponentRef = db
        .collection(`${this.path}/opponents`)
        .orderBy(sortBy, descending ? 'desc' : 'asc')
        .startAt((page - 1) * rowsPerPage)
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
}
</style>
