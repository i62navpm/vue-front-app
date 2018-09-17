<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true,
      defualt: () => ({ labels: [], datasets: [] }),
    },
    options: { type: Object, default: () => ({}) },
  },
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'top',
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: tooltipItems => `${tooltipItems.yLabel} personas`,
        },
      },
    })
  },
}
</script>
