<template>
  <div class="myquestions">
    <v-layout row wrap>
      <v-flex xs5>
        <v-btn to="/myquestions/create">Create Question</v-btn>
        <ListMyQuestions></ListMyQuestions>
      </v-flex>
      <v-flex xs7>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListMyQuestions from '@/components/myquestions/ListMyQuestions.vue'

export default {
  components: {
    ListMyQuestions
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
.myquestions {
  margin: 2%;
}
</style>
