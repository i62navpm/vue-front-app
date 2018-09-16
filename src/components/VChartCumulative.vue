<script>
import { Bar, mixins } from 'vue-chartjs'
import zoom from 'chartjs-plugin-zoom'

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
    this.addPlugin(zoom)

    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      zoom: { enabled: true },
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
