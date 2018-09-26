<template>
     <div>
      <v-flex xs12 v-for="(data, index) in allAnswer" :key="index">
        <v-card class="answer">
              <v-card-text>
                <div>
                  <div id="content" v-html="data.answer"></div>
                </div><br>
                 <h5 class="caption">Answered {{data.username}}</h5>
                <p class="title text-sm-center font-bold" style="color:#00B746">
                    Upvote : {{data.upvote.length}} / Downvote: {{data.downvote.length}}
                </p>
                <v-btn v-if="token" @click="upvote(data._id)"><i class="fa fa-thumbs-o-up" style="font-size:36px"></i></v-btn>
                <v-btn v-if="token"  @click="downvote(data._id)"><i class="fa fa-thumbs-o-down" style="font-size:36px"></i></v-btn>
              </v-card-text>
              <v-card-text>
                <UpdateAnswer v-if="token & data.username === username" :dataAnswer="data"></UpdateAnswer>
              </v-card-text>
        </v-card>
      </v-flex>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UpdateAnswer from '@/components/forum/UpdateAnswer.vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  components: {
    UpdateAnswer
  },
  computed: {
    ...mapState([
      'allAnswer',
      'baseURL',
      'token',
      'username'
    ]),
    token: {
      get () {
        return this.$store.state.token
      },
      set (value) {
        this.$store.commit('setToken', value)
      }
    },
    username: {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('setUsername', value)
      }
    },
    allAnswer: {
      get () {
        return this.$store.state.allAnswer
      },
      set (value) {
        this.$store.commit('setAllAnswers', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'getOneQuestions'
    ]),
    upvote (data) {
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/upvote/answer/${id}`,
        headers: {
          token
        },
        data: {
          idAnswer: data
        }
      })
        .then((result) => {
          swal(result.data.message)
          let id = this.$route.params.id
          this.getOneQuestions(id)
        })
        .catch((err) => {
          swal(err.response.data.message)
        })
    },
    downvote (idAnswer) {
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/downvote/answer/${id}`,
        headers: {
          token
        },
        data: {
          idAnswer: idAnswer
        }
      })
        .then((result) => {
          swal(result.data.message)
          let id = this.$route.params.id
          this.getOneQuestions(id)
        })
        .catch((err) => {
          swal(err.response.data.message)
        })
    }
  },
  created () {
    let id = this.$route.params.id
    this.getOneQuestions(id)
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
    let username = localStorage.getItem('username')
    if (username) {
      this.username = username
    }
  }
}
</script>

<style>
.answer {
  margin: 2%;
}
</style>
