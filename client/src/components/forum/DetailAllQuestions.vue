<template>
    <div>
        <v-flex xs12>
            <v-card class="detail">
                <v-card-text>
                    <div>
                        <h2 class="mb-0">{{oneQuestions.title}}</h2><br>
                        <div id="content" v-html="oneQuestions.questions"></div>
                    </div><br>
                    <p class="title text-sm-center font-bold" style="color:#00B746">
                        Upvote : {{oneQuestions.upvote.length}} / Downvote: {{oneQuestions.downvote.length}}
                    </p>
                    <v-btn v-if="token" @click="upvote"><i class="fa fa-thumbs-o-up" style="font-size:36px"></i></v-btn>
                    <v-btn v-if="token" @click="downvote"><i class="fa fa-thumbs-o-down" style="font-size:36px"></i></v-btn>
                </v-card-text>
                <v-card-text>
                    <h5 class="caption">Questions on {{ moment(oneQuestions.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB, by {{oneQuestions.userId.username}}</h5>
                    <wysiwyg v-model="answer" label="Answer" required></wysiwyg>
                    <v-btn v-if="token" color="black" style="color:white" @click="submit">Submit</v-btn>
                    <v-btn color="black" style="color:white" to="/forum">Back</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12>
            <CardAllAnswer></CardAllAnswer>
        </v-flex>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CardAllAnswer from '@/components/forum/CardAllAnswer.vue'
import axios from 'axios'
import moment from 'moment'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      answer: ''
    }
  },
  components: {
    CardAllAnswer
  },
  methods: {
    ...mapActions([
      'getOneQuestions'
    ]),
    moment: function (date) {
      return moment(date)
    },
    submit () {
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/addanswer/${id}`,
        headers: {
          token
        },
        data: {
          answer: this.answer
        }
      })
        .then((result) => {
          this.answer = ''
          let id = this.$route.params.id
          this.getOneQuestions(id)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    upvote () {
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/upvote/${id}`,
        headers: {
          token
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
    downvote () {
      let token = localStorage.getItem('token')
      let id = this.$route.params.id
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/downvote/${id}`,
        headers: {
          token
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
  computed: {
    ...mapState([
      'oneQuestions',
      'baseURL',
      'token'
    ]),
    token: {
      get () {
        return this.$store.state.token
      },
      set (value) {
        this.$store.commit('setToken', value)
      }
    },
    oneQuestions: {
      get () {
        return this.$store.state.oneQuestions
      },
      set (value) {
        this.$store.commit('setOneQuestions', value)
      }
    }
  },
  created () {
    let id = this.$route.params.id
    this.getOneQuestions(id)
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
  }
}
</script>

<style>
.detail {
  margin: 2%;
}
</style>
