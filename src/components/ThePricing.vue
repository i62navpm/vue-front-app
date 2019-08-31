<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center justify-space-around row wrap>
      <v-flex xs12>
        <p id="pricing" class="headline">
          Plan de suscripciones
        </p>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Suscripción de 1 mes</div>
              <span class="grey--text"
                >Accede a Listando<span class="orange--text">Me</span> durante 1
                mes</span
              >
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="px-3">
              <p class="body-1 mb-2 text-xs-center">
                <span class="display-3">1</span>
                <span class="display-1">.49€</span>
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Descubre tu posición en
                todas las listas
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Mantén la privacidad de tu
                perfil
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Consulta todos los listados
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Recibe mails cuando
                tengamos actualizaciones
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Recibe notificaciones Push
                en el móvil
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-layout mb-3 align-center justify-center row fill-height>
              <v-btn
                :disabled="isDisabled"
                :loading="loading"
                color="primary"
                @click.prevent="buyOneMonth()"
              >
                <v-icon class="mr-2">shopping_cart</v-icon>
                Comprar
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Suscripción de 3 mes</div>
              <span class="grey--text"
                >Accede a Listando<span class="orange--text">Me</span> durante 3
                meses</span
              >
            </div>
          </v-card-title>
          <v-card-text class="pt-0">
            <div class="px-3">
              <p class="body-1 mb-2 text-xs-center">
                <span class="display-3">3</span>
                <span class="display-1">.49€</span>
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Descubre tu posición en
                todas las listas
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Mantén la privacidad de tu
                perfil
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Consulta todos los listados
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Recibe mails cuando
                tengamos actualizaciones
              </p>
              <p class="body-1 mb-2">
                <v-icon color="green">check</v-icon> Recibe notificaciones Push
                en el móvil
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-layout mb-3 align-center justify-center row fill-height>
              <v-btn
                :disabled="isDisabled"
                :loading="loading"
                color="primary"
                @click.prevent="buyThreeMonths()"
              >
                <v-icon class="mr-2">shopping_cart</v-icon>
                Comprar
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-alert
      :value="success"
      type="success"
      dismissible
      transition="scale-transition"
    >
      Pagado correctamente!!
    </v-alert>
    <v-alert
      :value="error"
      type="error"
      dismissible
      transition="scale-transition"
    >
      Se ha producido un error en el pago, si vuelve a repetirse, por favor
      póngase en contacto con
      <a href="mailto:listandome@gmail.com" class="yellow--text"
        >listandome@gmail.com</a
      >
    </v-alert>
  </v-container>
</template>
<script>
import { fb } from '@/plugins/firebaseFunctions'
import { stripeCheckout } from '@/plugins/stripe'

export default {
  name: 'ThePricing',
  data() {
    return {
      error: false,
      success: false,
      loading: false,
      paymentType: 'monthly',
      checkout: stripeCheckout(this.payToServer.bind(this)),
      pay: fb.httpsCallable('stripePayment'),
    }
  },
  computed: {
    isDisabled() {
      return (
        this.$store.getters.hasPaid ||
        this.$store.getters.isLoading ||
        this.$store.getters.getAuthLoading
      )
    },
  },
  methods: {
    async payToServer(token) {
      this.loading = true
      this.$store.commit('setPaidLoading', true)
      try {
        await this.pay({ paymentType: this.paymentType, token })
        this.$store.commit('setPaid', true)
        this.success = true
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
        this.$store.commit('setPaidLoading', false)
      }
    },
    buyOneMonth() {
      if (!this.$store.state.auth.user.email)
        return this.$store.dispatch('openLoginDialog')
      this.paymentType = 'monthly'
      this.checkout.open({
        email: this.$store.state.auth.user.email || '',
        name: 'Maestros ListandoMe',
        description: 'Suscripción de 1 mes',
        currency: 'eur',
        amount: 149,
      })
    },
    buyThreeMonths() {
      if (!this.$store.state.auth.user.email)
        return this.$store.dispatch('openLoginDialog')
      this.paymentType = 'termly'
      this.checkout.open({
        email: this.$store.state.auth.user.email || '',
        name: 'Maestros ListandoMe',
        description: 'Suscripción de 3 meses',
        currency: 'eur',
        amount: 349,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home-title {
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
}
</style>
