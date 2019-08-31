<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :class="{ disabled: !alertNotifications.length }"
      :close-on-content-click="false"
      offset-y
      bottom
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn
          slot="activator"
          :disabled="!alertNotifications.length"
          icon
          dark
          v-on="on"
        >
          <v-badge left color="accent">
            <span v-if="alertNotifications.length" slot="badge">
              {{ alertNotifications.length }}
            </span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card>
        <v-list class="py-0" two-line>
          <template v-for="(data, index) in notifications">
            <v-list-item :key="data.date">
              <v-list-item-content>
                <v-list-item-title>
                  {{ data.notification.body }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ data.date }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon
                  class="ml-5"
                  color="grey"
                  @click="removeNotification(index)"
                  >close</v-icon
                >
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="index" light />
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
      menu: false,
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
}
</style>
