<template>
  <v-dialog
    :value="dialog"
    width="400"
    persistent
    @input="closeDialog"
  >
    <v-form 
      ref="form"
      v-model="valid" 
      lazy-validation 
      @submit.prevent="submit">
      <v-card 
        class="login-dialog" 
        light>
        <v-card-title
          class="headline primary white--text"
          primary-title
        >
          <v-icon 
            color="white" 
            class="mr-2" 
          >search</v-icon>
          Búscate en los listados
          <v-spacer/>
          <v-btn 
            flat 
            icon
            @click.native="closeDialog">
            
            <v-icon 
              class="white--text" 
            >
              close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="px-3">
          <p class="subheading text-xs-center">Guardaremos tu nombre para que te puedas <strong class="primary--text">encontrar más fácilmente</strong></p>

          <div class="dialog-select">
            <v-autocomplete
              v-model="myUser"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              :color="isLoading ? 'accent' : 'primary'"
              :readonly="isLoading"
              :rules="[v => !!v || 'Indica tu nombre']"
              :class="{loading: isLoading}"
              :append-icon="isLoading ? 'refresh' : 'search'"
              prepend-icon="person"
              no-filter
              autofocus
              hide-no-data
              clearable
              hide-details
              hide-selected
              item-text="apellidosynombre"
              item-value="apellidosynombre"
              label="Apellidos, nombre"
              return-object
              required
            >
              <template
                slot="selection"
                slot-scope="{ item, selected }"
                
              >
                <span class="capitalize">{{ item.apellidosynombre }}</span>
              </template>
              <template
                slot="item"
                slot-scope="{ item, tile }"
              >
                <v-list-tile-content>
                  <v-list-tile-title 
                    class="capitalize" 
                    v-text="item.apellidosynombre"/>
                  <v-list-tile-sub-title v-text="`*****${item.dni}`"/>
                </v-list-tile-content>
              </template>
            </v-autocomplete>
          </div>

          <p class="subheading text-xs-center mt-5">
            ¿Quieres que tu posición en los listados sea <strong class="primary--text">pública</strong> para los demás o prefieres hacerlo <strong class="error--text">privado</strong> y sólo sería visible para ti?
          </p>
          <v-layout 
            align-center 
            justify-center 
            column 
          >
            <v-flex>
              <v-switch 
                v-model="privateProfile"
                :label="privateProfile ? 'Privado' : 'Público'"
                :prepend-icon="privateProfile ? 'visibility_off' : 'remove_red_eye'"
                color="error"/>
            </v-flex> 
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            flat 
            @click.native="closeDialog">Omitir</v-btn>
          <v-spacer/>
          <v-btn 
            :disabled="!valid" 
            :loading="loading"
            color="primary" 
            flat
            @click="submit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

</template>
<script>
import debounce from 'lodash.debounce'
import { captureException } from '@sentry/browser'
import { fb } from '@/plugins/firebaseFunctions'
import PeopleSearchSelect from '@/components/PeopleSearchSelect'

export default {
  name: 'TheDialogNewUser',
  components: {
    PeopleSearchSelect,
  },
  data() {
    return {
      loading: false,
      valid: false,
      myUser: null,
      privateProfile: false,
      isLoading: false,
      items: [],
      search: null,
      searchPerson: fb.httpsCallable('searchPerson'),
    }
  },
  computed: {
    dialog() {
      return this.$store.state.loginDialog.newUser
    },
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
        this.items = data.map(({ item }) => item)
      } catch (err) {
        captureException(err)
      } finally {
        this.isLoading = false
      }
    }, 1000),
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('closeNewUserDialog')
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await this.$store.dispatch('setMyUser', {
            myUser: this.myUser,
            privateProfile: this.privateProfile,
          })

          this.closeDialog()
        } catch (err) {
          captureException(err)
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss">
.capitalize {
  text-transform: capitalize;
}
.dialog-select {
  .v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
    transform: none;
  }
  .loading .v-input__icon.v-input__icon--append {
    animation: rotating 1s linear infinite;
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
}
</style>
