<template>
  <v-toolbar dark>
    <v-toolbar-title>Stuck-OverSlow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">Home</v-btn>
      <v-btn flat to="/forum">Forum</v-btn>
      <v-btn flat to="/news">News</v-btn>
      <v-btn flat v-if="token" to="/myquestions">My Questions</v-btn>
      <v-btn flat v-if="!token" to="/join">Join</v-btn>
      <v-btn flat v-if="token" @click="submit">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
  methods: {
    ...mapActions([
      'logout'
    ]),
    submit () {
      this.logout()
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

</style>
