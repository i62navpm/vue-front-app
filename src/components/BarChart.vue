<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
            hoverBackgroundColor: [
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
            borderColor: [
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
            borderWidth: 2,
            backgroundColor: [
              '#3366CC80',
              '#DC391280',
              '#FF990080',
              '#10961880',
              '#99009980',
              '#3B3EAC80',
              '#0099C680',
              '#DD447780',
              '#66AA0080',
              '#B82E2E80',
              '#31639580',
              '#99449980',
              '#22AA9980',
              '#AAAA1180',
              '#6633CC80',
              '#E6730080',
              '#8B070780',
              '#32926280',
              '#5574A680',
              '#3B3EAC80',
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
          enabled: true,
          mode: 'single',
          callbacks: {
            label: tooltipItems => `${tooltipItems.yLabel} personas`,
          },
        },
      }
    )
  },
}
</script>
