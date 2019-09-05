<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout align-space-around justify-space-between column fill-height>
        <v-flex>
          <p class="display-1">
            {{ $route.params.modality | modality }}
            <v-download-button-list
              :list="
                $route.params.modality === 'nextCitationList'
                  ? 'incorporateList'
                  : $route.params.modality
              "
              class="float-right"
            />
          </p>
          <p class="headline">{{ $route.params.specialty | specialty }}</p>
        </v-flex>
        <v-flex>
          <router-view />
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import VDownloadButtonList from '@/components/VDownloadButtonList'

export default {
  name: 'SpecialtyTable',
  components: {
    VDownloadButtonList,
  },
}
</script>

<style lang="scss">
.float-right {
  float: right;
}
td {
  text-transform: capitalize;
  a {
    text-decoration: none;
  }
}

.block-stats {
  height: 0;
  transition: all 0.2s linear;
  &.show-stats {
    height: 500px;
  }
}
.v-datatable thead th.column {
  text-transform: capitalize;
}
</style>
