<template>
    <div class="forum">
    <v-layout row wrap>
      <v-flex xs2>
        <v-flex xs12>
          <v-card class="search">
            <v-card-actions>
                <v-text-field name="name" label="Search by Title" id="id" v-model="search"></v-text-field>
            </v-card-actions>
          </v-card>
          <v-card class="search">
            <v-card-text>
            <h3>Category</h3>
                <v-btn color="black" style="color:white" @click="getCategory('')">All Questions</v-btn>
                <v-btn color="black" style="color:white" @click="getCategory('Javascript')">Javascript</v-btn>
                <v-btn color="black" style="color:white" @click="getCategory('Python')">Python</v-btn>
                <v-btn color="black" style="color:white" @click="getCategory('Java')">Java</v-btn>
                <v-btn color="black" style="color:white" @click="getCategory('PHP')">PHP</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs10>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState([
      'token',
      'allQuestions'
    ]),
    token: {
      get () {
        return this.$store.state.token
      },
      set (value) {
        this.$store.commit('setToken', value)
      }
    },
    allQuestions: {
      get () {
        return this.$store.state.allQuestions
      },
      set (value) {
        this.$store.commit('setAllQuestions', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'getAllCategory',
      'getAllQuestions'
    ]),
    getCategory (category) {
      this.getAllCategory(category)
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.token = true
    }
  },
  watch: {
    search: function (newData, oldData) {
      if (newData) {
        let questions = []
        this.allQuestions.forEach(element => {
          if (element.title.toLowerCase().indexOf(newData.toLowerCase()) > -1) {
            questions.push(element)
          }
        })
        this.allQuestions = questions
      } else if (oldData) {
        this.getAllQuestions()
      }
    }
  }
}
</script>

<style>
.forum {
  margin: 2%;
}
.search {
  margin-left: 10%;
  margin-top: 9%;
}
</style>
