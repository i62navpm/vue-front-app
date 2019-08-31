<template>
  <v-list two-line subheader>
    <v-list-tile avatar>
      <v-list-tile-avatar
        :color="$options.filters.materialColor(index)"
        size="38"
      >
        <span v-if="data.position >= 0" class="caption white--text">{{
          data.position
        }}</span>
        <v-icon v-else-if="data.position > -4" color="white">check</v-icon>
        <v-icon v-else color="white">remove_circle_outline</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ data.modality | modality }}</v-list-tile-title>
        <v-list-tile-sub-title>{{
          data.specialty | specialty
        }}</v-list-tile-sub-title>
        <v-list-tile-sub-title v-if="data.position === -4" class="caption">
          <v-icon small class="warning--text">warning</v-icon>
          Última posición conocida: {{ lastPosition }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-user-list-status-trending :trending="trending" />
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>
<script>
import VUserListStatusTrending from '@/components/VUserListStatusTrending'

export default {
  name: 'VUserListStatus',
  components: {
    VUserListStatusTrending,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    lastPosition() {
      let [{ position }] = Object.values(
        this.data.info[this.data.info.length - 1]
      ) || [{}]
      return position
    },
    trending() {
      const date = new Date()
      const lastDate = date.toLocaleDateString()
      const position = this.data.info.reduce((acc, curr) => {
        let newDate = curr[lastDate]
          ? curr[lastDate].position - this.data.position
          : 0
        return newDate > acc ? newDate : acc
      }, 0)

      return position
    },
  },
}
</script>

<style lang="scss">
.v-icon {
  &.rotate {
    transform: rotate(90deg);
  }
}
.v-badge {
  span {
    font-size: 10px;
  }
}
.v-chip__content {
  font-size: 10px;
}
</style>
