<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        light
      >
        <v-card-text class="white--text">
          Espera por favor
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
          <v-list dense>
            <v-list-tile color="white">
              <v-list-tile-action>
                <v-progress-circular
                  :width="2"
                  indeterminate
                  size="16"
                  class="mr-3"
                  color="pink"
                />
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title class="caption">
                  Buscando en la lista normal
                </v-list-tile-title >
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile color="white">
              <v-list-tile-action>
                <v-progress-circular
                  :width="2"
                  indeterminate
                  size="16"
                  class="mr-3"
                  color="pink"
                />
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title class="caption">
                  Buscando en la lista bilingüe
                </v-list-tile-title >
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile color="white">
              <v-list-tile-action>
                <v-progress-circular
                  :width="2"
                  indeterminate
                  size="16"
                  class="mr-3"
                  color="pink"
                />
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title class="caption">
                  Buscando en la lista de voluntarios
                </v-list-tile-title >
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'TheDialogPeopleSearch',
  computed: {
    dialog() {
      return this.$store.state.searchDialog.open
    },
  },
  methods: {
    closeDialog() {
      setTimeout(() => {
        this.$store.dispatch('setSearchDialog', false)
        this.$router.push('about')
      }, 5000)
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-list {
  background: transparent;
}
</style>
