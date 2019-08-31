<template>
  <v-card>
    <v-layout
      v-bind="binding"
      align-space-around
      justify-space-around
      fill-height
    >
      <v-flex xs12>
        <div class="section section-left">
          <v-layout align-center justify-center row fill-height>
            <v-flex xs12>
              <v-chart-bar :data="statObject" />
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import VChartBar from '@/components/VChartBar'

export default {
  name: 'StatStaticHomeCard',
  components: {
    VChartBar,
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
  computed: {
    binding() {
      const binding = {}

      if (!this.$vuetify.breakpoint.mdAndUp) binding.column = true

      return binding
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
