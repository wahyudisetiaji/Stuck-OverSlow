<template>
  <div>
    <CarouselHome></CarouselHome>
    <JumbotronHome></JumbotronHome>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CarouselHome from '@/components/home/CarouselHome.vue'
import JumbotronHome from '@/components/home/JumbotronHome.vue'

export default {
  components: {
    CarouselHome,
    JumbotronHome
  },
  computed: {
    ...mapState([
      'token'
    ]),
    token: {
      get () {
        return this.$store.state.token
      },
      set (value) {
        this.$store.commit('setToken', value)
      }
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
  }
}
</script>
