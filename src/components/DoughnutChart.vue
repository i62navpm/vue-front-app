<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    data: {
      type: Object,
      required: true,
      defualt: () => ({ labels: [], values: [] }),
    },
    options: { type: Object, default: () => ({}) },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.values,
            backgroundColor: [
              '#3366CC',
              '#DC3912',
              '#FF9900',
              '#109618',
              '#990099',
              '#3B3EAC',
              '#0099C6',
              '#DD4477',
              '#66AA00',
              '#B82E2E',
              '#316395',
              '#994499',
              '#22AA99',
              '#AAAA11',
              '#6633CC',
              '#E67300',
              '#8B0707',
              '#329262',
              '#5574A6',
              '#3B3EAC',
            ],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            title: () => {
              return '#Personas'
            },
          },
        },
      }
    )
  },
}
</script>
