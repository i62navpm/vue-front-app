<template>
  <v-card>
    <v-layout 
      v-bind="binding" 
      align-space-around 
      justify-space-around
      fill-height>
      <v-flex 
        xs12 
        sm6 
      >
        <div class="section section-left">
          <v-layout 
            align-center 
            justify-center 
            row 
            fill-height>
            <v-flex xs12>
              <doughnut-chart :data="statObject"/>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>

      <v-flex 
        xs12 
        sm6
      >
        <div class="section section-right">
          <v-list 
            two-line 
            dark>
            <template v-for="(item, key) in data">
              <v-list-tile
                :key="item.createdAt"
                @click="goToList(key)"
              >
                <v-list-tile-content>
                  <v-list-tile-title> 
                    {{ key |specialty }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Fecha de creación: {{ parseDate(item.createdAt) }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import DoughnutChart from '@/components/DoughnutChart'

export default {
  name: 'StatDynamicHomeCard',
  components: {
    DoughnutChart,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    list: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      titleMap: {
        assignmentList: 'Listado de asignaciones',
        normalList: 'Listado normal',
        bilingualList: 'Listado bilingüe',
        voluntaryList: 'Listado de voluntarios',
        citationList: 'Listado de citaciones',
      },
    }
  },
  computed: {
    binding() {
      const binding = {}

      if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true

      return binding
    },
    title() {
      return this.titleMap[this.list]
    },
    statObject() {
      return {
        labels: Object.keys(this.data).map(item =>
          this.$options.filters.specialty(item)
        ),
        values: Object.values(this.data).map(({ total }) => total),
      }
    },
  },
  methods: {
    goToList(list) {
      console.log(list)
    },
    parseDate(value) {
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
}
</script>

<style lang="scss">
.section {
  height: 100%;
  padding: 1em 2em;
}
</style>
