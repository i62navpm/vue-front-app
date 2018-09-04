<template>
  <v-toolbar
    v-scroll="handleScroll"
    color="primary"
    dark
    app
  >
    <v-toolbar-side-icon @click.stop="toggleSidebar(!drawer)"/>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer/>
    <!-- TODO: Select tag -->
    <v-spacer/>

    <v-avatar 
      color="teal" 
      size="32">
      <span class="white--text">M</span>
    </v-avatar>
  </v-toolbar>

</template>
<script>
export default {
  name: 'TheToolbar',
  directives: {
    scroll: {
      inserted(el, binding) {
        const f = evt =>
          binding.value(evt, el) && window.removeEventListener('scroll', f)

        window.addEventListener('scroll', f)
      },
    },
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    toggleSidebar(value) {
      this.$store.commit('setSidebar', value)
    },
    handleScroll(evt, el) {
      const step = 12 / 300

      el.setAttribute(
        'style',
        `box-shadow: rgba(0, 0, 0, 0.28) 0px ${
          step * window.scrollY - 8 < 4 ? step * window.scrollY - 8 : 4
        }px 8px;`
      )
    },
  },
}
</script>

<style lang="scss">
.v-toolbar[data-booted='true'] {
  transition: null;
  box-shadow: rgba(0, 0, 0, 0.28) 0px -8px 8px;
}
</style>
