<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true,
      defualt: () => [{ labels: [], values: [], label: '' }],
    },
    options: { type: Object, default: () => ({}) },
  },
  mounted() {
    const labels = new Set(
      this.data.reduce((acc, serie) => {
        acc.push(...serie.labels)
        return acc
      }, [])
    )
    const datasets = this.data.reduce((acc, serie, index) => {
      const dateIndex = [...labels].map(date => serie.labels.lastIndexOf(date))
      const datasets = {
        label: serie.label,
        data: dateIndex.map(date => serie.values[date]),
        backgroundColor: this.$options.filters.materialColor(index),
        borderColor: this.$options.filters.materialColor(index) + '80',
        fill: false,
      }
      acc.push(datasets)
      return acc
    }, [])

    this.renderChart(
      {
        labels: [...labels],
        datasets,
      },
      {
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
      }
    )
  },
}
</script>
