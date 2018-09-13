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
    const colors = [
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
    ]

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
        backgroundColor: colors[index],
        borderColor: colors[index] + '80',
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
          position: 'left',
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
