<template>
  <p>hola</p>
</template>

<script>
import store from '@/store'
export default {
  name: 'User',
  data() {
    return {
      items: [],
    }
  },
  async beforeRouteEnter(to, from, next) {
    let result = await store.dispatch('openSearchDialog', to.params.id)
    console.log(result)
    next(vm => (vm.items = result))
  },
}
</script>
