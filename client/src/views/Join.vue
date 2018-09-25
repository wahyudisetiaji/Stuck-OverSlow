<template>
    <div>
        <v-flex xs12 fluid>
            <v-layout row wrap>
                <v-flex xs6>
                    <div class="jumbotron">
                        <JumbotronJoin></JumbotronJoin>
                    </div>
                </v-flex>
                <v-flex xs6>
                    <div class="register">
                        <router-view></router-view>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
    </div>
</template>

<script>
import JumbotronJoin from '@/components/join/JumbotronJoin.vue'
import { mapState } from 'vuex'

export default {
  components: {
    JumbotronJoin
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

<style>
.jumbotron {
    margin: 10px;
    background-color: #808080;
}
.register {
    margin: 10px;
}
</style>
