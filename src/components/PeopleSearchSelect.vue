<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    :color="isLoading ? 'accent' : 'primary'"
    :readonly="isLoading"
    :class="{ loading: isLoading, visible: $route.name !== 'home' }"
    :append-icon="isLoading ? 'refresh' : 'search'"
    no-filter
    attach
    hide-no-data
    clearable
    hide-details
    hide-selected
    item-text="item"
    item-value="item"
    label="Introduce tus apellidos, nombre"
    class="main-select"
    dark
    solo-inverted
    @change="goToPerson"
  >
    <template slot="selection" slot-scope="{ item }">
      {{ item.item.apellidosynombre }}
    </template>
    <template slot="item" slot-scope="{ item }">
      <v-list-tile-content>
        <v-list-tile-title v-text="item.item.apellidosynombre" />
        <v-list-tile-sub-title v-text="`*****${item.item.dni}`" />
      </v-list-tile-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { captureException } from '@sentry/browser'
import debounce from 'lodash.debounce'
import { fb } from '@/plugins/firebaseFunctions'

export default {
  name: 'PeopleSearchSelect',
  directives: {},
  data() {
    return {
      model: null,
      isLoading: false,
      items: [],
      search: null,
      searchPerson: fb.httpsCallable('searchPerson'),
    }
  },
  watch: {
    search: debounce(async function(value) {
      if (!value || value.length < 3) return
      if (!this.$store.getters.getAuth.email) {
        this.open()
        return
      }

      this.isLoading = true
      try {
        const { data } = await this.searchPerson(value)
        this.items = data
      } catch (err) {
        captureException(err)
      } finally {
        this.isLoading = false
      }
    }, 1000),
  },
  methods: {
    open() {
      this.$store.dispatch('openLoginDialog')
    },
    goToPerson() {
      if (!this.model) return
      this.$router.push(`/${this.model.apellidosynombre}`)
    },
  },
}
</script>

<style lang="scss">
.main-select {
  &.visible {
    opacity: 1 !important;
    visibility: visible !important;
  }
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) .v-input__slot {
  box-shadow: none;
  .v-label {
    color: white;
  }
  input {
    transition: color 0.15s linear;
    &[readonly] {
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.loading .v-input__icon.v-input__icon--append {
  animation: rotating 1s linear infinite;
}
.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: none;
}
.theme--dark.v-list {
  background: white;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
  .v-list__tile__sub-title {
    color: rgba(0, 0, 0, 0.5);
  }
  .v-list__tile--highlighted,
  :hover {
    transition: all 0.15s linear;
    background: rgb(238, 238, 238);
  }
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
</style>
