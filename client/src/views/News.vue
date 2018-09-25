<template>
  <div>
    <v-layout v-for="(data, index) in news" :key="index">
      <v-flex xs12 >
        <v-card class="news">
          <v-img
            :src="data.urlToImage"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{data.title}}</h3>
              <div id="content" v-html="data.content"></div>
            </div>
          </v-card-title>

          <v-card-text>
            <p>Author: {{data.author}} -- Source: {{data.source.name}}</p>
            <v-btn color="black" style="color:white"><a :href="data.url" style="color:white">Explore</a></v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'token',
      'news'
    ]),
    token: {
      get () {
        return this.$store.state.token
      },
      set (value) {
        this.$store.commit('setToken', value)
      }
    },
    news: {
      get () {
        return this.$store.state.news
      },
      set (value) {
        this.$store.commit('setNews', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'getNews'
    ])
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
    this.getNews()
  }
}
</script>

<style>
.news {
  margin: 2%;
}
</style>
