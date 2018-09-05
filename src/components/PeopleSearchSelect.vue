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
      {{ selected }}
    </template>
    <template
      slot="item"
      slot-scope="{ item, tile }"
    >
      {{ item }}
    </template>
  </v-autocomplete>

</template>
<script>
export default {
  name: 'PeopleSearchSelect',
  directives: {},
  data() {
    return {
      model: null,
      isLoading: false,
      items: [],
      search: null,
    }
  },
  methods: {},
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
</style>
