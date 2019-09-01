<template>
  <v-layout row justify-center>
    <v-btn
      :loading="loading"
      flat
      icon
      large
      color="grey"
      @click.native="openDialog"
    >
      <v-icon large>picture_as_pdf</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline primary white--text" primary-title>
          {{ list | modality }}
          <v-spacer />
          <v-btn flat icon @click.native="closeDialog">
            <v-icon class="white--text">
              close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-layout align-center justify-center row wrap>
            <v-flex xs12 class="text-xs-center">
              <v-date-picker
                v-model="date"
                :allowed-dates="allowedDates"
                locale="es"
                first-day-of-week="1"
                color="error"
                header-color="primary"
              />
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :loading="loadingDownload"
            color="primary"
            flat
            @click="downloadFile"
          >
            <v-icon class="pr-3">cloud_download</v-icon>
            Descargar
          </v-btn>
          <v-spacer />
          <v-btn
            v-if="$vuetify.breakpoint.smAndUp"
            :href="url"
            color="primary"
            flat
            target="_blank"
          >
            Abrir
            <v-icon class="pl-3">open_in_browser</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { captureException } from '@sentry/browser'
import { fb } from '@/plugins/firebaseFunctions'
import { storage } from '@/plugins/firebaseStorage'
import axios from 'axios'

export default {
  name: 'VDownloadButtonList',
  props: {
    list: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      loadingDownload: false,
      availableFiles: [],
      date: new Date().toISOString().substring(0, 10),
      getListFiles: fb.httpsCallable('getListFiles'),
      url: '',
    }
  },
  watch: {
    date: async function() {
      this.url = await this.getFileUrl(`${this.list}/${this.date}.pdf`)
    },
  },
  methods: {
    allowedDates(val) {
      return this.availableFiles.includes(val)
    },
    async openDialog() {
      if (!this.$store.getters.getAuth.email) {
        this.$store.dispatch('openLoginDialog')
        return
      }
      this.loading = true
      try {
        const { data = [] } = await this.getListFiles(this.list)
        this.availableFiles = data
        this.date = this.availableFiles[this.availableFiles.length - 1]
      } catch (err) {
        captureException(err)
      } finally {
        this.dialog = true
        this.loading = false
      }
    },
    async downloadFile() {
      this.loadingDownload = true

      try {
        const url = await this.getFileUrl(`${this.list}/${this.date}.pdf`)
        axios({
          url,
          responseType: 'blob',
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            `${this.$options.filters.modality(this.list)}/${this.date}.pdf`
          )
          document.body.appendChild(link)
          link.click()
        })
      } catch (err) {
        captureException(err)
      } finally {
        this.closeDialog()
        this.loadingDownload = false
      }
    },
    getFileUrl(file) {
      var storageRef = storage.ref()
      var fileRef = storageRef.child(file)

      return fileRef.getDownloadURL()
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss"></style>
