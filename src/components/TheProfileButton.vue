<template>
  <div>
    <the-dialog-my-profile ref="dialogMyProfile"/>
  
    <v-menu
      :close-on-content-click="false" 
      :nudge-width="300"
      attach
      offset-y
      bottom
      left
      light
    >
      <v-avatar 
        slot="activator"
        color="red darken-4" 
        class="ma-1"
        size="32">
        <span class="white--text">{{ user.displayName.charAt(0).toUpperCase() }}</span>
      </v-avatar>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar color="red darken-4" >
              <span class="white--text">{{ user.displayName.charAt(0).toUpperCase() }}</span>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }} </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                class="grey--text"
                icon
                @click="logout"
              >
                <v-icon>logout</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider/>

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch 
                :input-value="user.emailNotifications"
                :loading="loadingEmailNotifications"
                :disabled="loadingEmailNotifications"
                color="primary"
                @change="toggleEmailNotifications"/>
            </v-list-tile-action>
            <v-list-tile-title>Notificaciones email</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-switch
                :input-value="user.pushNotifications"
                :loading="loadingPushNotifications"
                :disabled="loadingPushNotifications"
                color="primary"
                @change="togglePushNotifications"/>
            </v-list-tile-action>
            <v-list-tile-title>Notificaciones push</v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <the-remove-user-button/>
          <v-spacer/>
          <v-btn 
            flat 
            color="primary"
            small
            @click.native="openDialogNewUser">
            <v-icon 
              class="mr-2" 
              small>person</v-icon>
            Mi perfil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import TheRemoveUserButton from '@/components/TheRemoveUserButton'
import TheDialogMyProfile from '@/components/TheDialogMyProfile'

export default {
  name: 'TheProfileButton',
  components: {
    TheRemoveUserButton,
    TheDialogMyProfile,
  },
  data() {
    return {
      loadingEmailNotifications: false,
      loadingPushNotifications: false,
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    user() {
      return this.auth.user || {}
    },
    myUser() {
      return this.auth.myUser || {}
    },
  },
  methods: {
    openDialogNewUser() {
      const { privateProfile, ...rest } = this.myUser
      this.$refs.dialogMyProfile.openDialog({ privateProfile, myUser: rest })
    },
    async toggleEmailNotifications(value) {
      this.loadingEmailNotifications = true
      try {
        await this.$store.dispatch('toggleEmailNotifications', value)
      } catch (err) {
        console.err(err)
      } finally {
        this.loadingEmailNotifications = false
      }
    },
    async togglePushNotifications(value) {
      this.loadingPushNotifications = true
      try {
        await this.$store.dispatch('togglePushNotifications', value)
      } catch (err) {
        console.err(err)
      } finally {
        this.loadingPushNotifications = false
      }
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style lang="scss">
</style>
