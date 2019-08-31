<template>
  <v-dialog v-model="dialog" persistent dark max-width="500px">
    <v-btn slot="activator" icon>
      <v-icon>feedback</v-icon>
    </v-btn>
    <v-card color="primary">
      <v-card-title>
        <span class="headline">Enviar comentarios</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-textarea
            v-model="message"
            :rules="messageRules"
            auto-grow
            color="white"
            autofocus
            box
            label="Describe el problema o comparte tus ideas"
            rows="5"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn flat @click.native="close">Cerrar</v-btn>
        <v-btn
          :loading="loading"
          :disabled="!valid || loading"
          flat
          @click.native="submit"
          >Enviar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { fb } from '@/plugins/firebaseFunctions'
import { captureException } from '@sentry/browser'

export default {
  name: 'TheFeedbackButton',
  data() {
    return {
      loading: false,
      dialog: false,
      valid: true,
      message: '',
      messageRules: [v => !!v || 'El comentario es obligatorio'],
      sendMessage: fb.httpsCallable('sendEmailFeedback'),
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await this.sendMessage({
            message: `Email: ${this.$store.state.auth.user.email}
            <br><br>Browser: ${navigator.userAgent}
            <br><br>Mensaje: ${this.message}`,
          })
          this.close()
        } catch (err) {
          captureException(err)
        } finally {
          this.loading = false
        }
      }
    },
    close() {
      this.dialog = false
      this.$refs.form.reset()
    },
  },
}
</script>

<style lang="scss"></style>
