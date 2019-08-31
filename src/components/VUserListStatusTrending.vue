<template>
  <v-badge :right="trending < 0" :left="trending >= 0" overlap>
    <span slot="badge">{{ trendingAbs || 0 }}</span>
    <v-tooltip v-if="trending > 0" bottom>
      <span slot="activator"
        ><v-icon large color="green">
          trending_up
        </v-icon>
      </span>
      <span>Estás más cerca! 🎉</span>
    </v-tooltip>
    <v-tooltip v-else-if="trending < 0" bottom>
      <span slot="activator"
        ><v-icon large color="red">
          trending_down
        </v-icon>
      </span>
      <span>Te has alejado 😭</span>
    </v-tooltip>
    <v-tooltip v-else bottom>
      <span slot="activator"
        ><v-icon large color="yellow darken-2" class="rotate">
          pause
        </v-icon>
      </span>
      <span>Te mantienes igual 😒</span>
    </v-tooltip>
  </v-badge>
</template>
<script>
export default {
  name: 'VUserListStatusTrending',
  props: {
    trending: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    trendingAbs() {
      return Math.abs(this.trending)
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
.v-tooltip {
  .v-icon {
    border: 2px solid;
    border-radius: 50%;
  }
}
</style>
