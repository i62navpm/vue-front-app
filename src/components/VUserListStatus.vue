<template>
  <v-list 
    two-line 
    subheader>
    <v-list-tile
      avatar
    >
      <v-list-tile-avatar 
        color="grey lighten-1 white--text" 
        size="38">
        <span class="caption">{{ data.position }}</span>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ data.modality | modality }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ data.specialty | specialty }}</v-list-tile-sub-title>
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
  },
  computed: {
    trending() {
      const [lastPosition = {}] = this.data.info.slice(-1).values()
      const [{ position = 0 } = {}] = Object.values(lastPosition)
      return position - this.data.position
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
