<template>
  <v-layout 
    row 
    justify-center>
    <v-btn 
      :loading="loading"
      flat 
      icon
      large
      color="grey"
      @click.native="openDialog">
      <v-icon large >picture_as_pdf</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-title
          class="headline primary white--text"
          primary-title
        >
          PDF {{ list | modality }}
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

        <v-card-text>
          <v-layout 
            align-center 
            justify-center
            row 
            wrap>
            <v-flex 
              xs12
              class="text-xs-center">
              <v-date-picker 
                v-model="date"
                :max="today"
                locale="es"
                color="primary" 
                header-color="primary"/>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Descargar
            <v-icon class="pl-3">cloud_download</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
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
      date: new Date().toISOString().substring(0, 10),
    }
  },
  computed: {
    today() {
      return new Date().toISOString().substring(0, 10)
    },
  },
  methods: {
    openDialog() {
      this.loading = true

      setTimeout(() => {
        this.dialog = true
        this.loading = false
      }, 1000)
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>

<style lang="scss">
</style>
