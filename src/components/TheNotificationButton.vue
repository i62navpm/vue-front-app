<template>
  <div class="notification-button">
    <v-menu
      :class="{disabled: !alertNotifications.length}"
      :close-on-content-click="false" 
      offset-y
      bottom
      left
    >
      
      <v-btn 
        slot="activator" 
        :disabled="!alertNotifications.length"
        icon>
        <v-badge 
          left 
          color="accent">
          <span 
            v-if="alertNotifications.length" 
            slot="badge">{{ alertNotifications.length }}</span>
          <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>

      <v-card v-if="notifications.length">
        <v-list 
          class="py-0"
          two-line 
          dark>
          <template v-for="(data, index) in notifications">
            <v-list-tile
              :key="data.date"
            >
              <v-list-tile-content>
                <v-list-tile-title> 
                  {{ data.notification.body }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ data.date }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon 
                  class="ml-5"
                  color="grey"
                  @click="removeNotification(index)">close</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
              :key="index"
              light
            />
          </template>
        </v-list>

      </v-card>
    </v-menu>
  </div>

</template>

<script>
export default {
  name: 'TheNotificationButton',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    notifications() {
      return this.$store.getters.getNotifications
    },
    alertNotifications() {
      return this.notifications.filter(notification => !notification.viewed)
    },
  },
  methods: {
    removeNotification(index) {
      this.$store.commit('removeNotification', index)
    },
  },
}
</script>

<style lang="scss">
.notification-button {
  .v-badge {
    span {
      font-size: 10px;
    }
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: black;
  }
}
</style>
