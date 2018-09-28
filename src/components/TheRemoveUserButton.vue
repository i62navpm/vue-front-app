<template>
  <v-layout 
    row 
    justify-end
  >
    <v-dialog 
      v-model="dialog" 
      max-width="290">
      <v-btn 
        slot="activator" 
        color="error" 
        flat 
        @click="menu = false">Eliminar mi cuenta</v-btn>
      <v-form 
        ref="form" 
        v-model="valid"
        lazy-validation 
        @submit.prevent="submit">
        <v-card>
          <v-card-title class="headline">¿Quieres eliminar tu cuenta?</v-card-title>
          <v-card-text>
            <p>
              Borraremos todos tus datos de la aplicación además de tú vinculación con las notificaciones push y correos electrónicos.
            </p>
          
            <v-text-field
              v-model="email"
              :rules="messageRules"
              type="email"
              autofocus
              label="Escribe tu correo"
              required
            />
        
          </v-card-text>
        
          <v-card-actions>
            <v-spacer/>

            <v-btn 
              :disabled="!valid" 
              :loading="loading"
              color="error" 
              flat
              @click="submit">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: 'TheRemoveUserButton',
  data() {
    return {
      dialog: false,
      loading: false,
      valid: true,
      email: '',
      messageRules: [
        v => !!v || 'El correo es obligatorio',
        v => /.+@.+/.test(v) || 'Mete un correo válido',
      ],
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    user() {
      return this.auth.user || {}
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.email !== this.user.email) {
          this.$refs.form.reset()
          this.loading = false
          return
        }

        try {
          await this.$store.dispatch('remove')
          this.dialog = false
          this.$router.push({ name: 'home' })
        } catch (err) {
          console.log(err)
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss">
.v-list__tile__action {
  min-width: auto;
}
</style>
