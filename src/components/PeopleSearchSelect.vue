<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    :color="isLoading ? 'accent' : 'primary'"
    no-filter
    attach
    hide-no-data
    clearable
    hide-details
    hide-selected
    item-text="item"
    item-value="item"
    label="Escribe tu nombre o tu dni"
    class="main-select"
    append-icon="search"
    dark  
    solo-inverted
  >
    <template
      slot="selection"
      slot-scope="{ item, selected }"
    >
      {{ item.item.apellidosynombre }}
    </template>
    <template
      slot="item"
      slot-scope="{ item, tile }"
    >
      <v-list-tile-content>
        <v-list-tile-title v-text="item.item.apellidosynombre"/>
        <v-list-tile-sub-title v-text="`*****${item.item.dni}`"/>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>mdi-coin</v-icon>
      </v-list-tile-action>
    </template>
  </v-autocomplete>

</template>
<script>
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
      if (!value) return
      this.isLoading = true
      try {
        const { data } = await this.searchPerson(value)
        this.items = data
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    }, 400),
  },
}
</script>

<style lang="scss">
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) .v-input__slot {
  box-shadow: none;
  .v-label {
    color: white;
  }
}
.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: none;
}
.theme--dark.v-list {
  background: white;
  transition: none;
  color: rgba(0, 0, 0, 0.87);
  .v-list__tile__sub-title {
    color: rgba(0, 0, 0, 0.54);
  }

  div {
    &:hover {
      background: rgb(238, 238, 238);
    }
  }
}
</style>
