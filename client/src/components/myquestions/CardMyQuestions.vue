<template>
    <div>
      <v-flex xs12 v-for="(data, index) in myQuestions" :key="index">
        <v-card class="mylist">
              <v-card-text>
                <div>
                  <h3 class="headline mb-0">{{data.title}}</h3>
                </div>
              </v-card-text>
              <v-card-text>
                <v-btn color="black" style="color:white" :to="`/myquestions/detail/${data._id}`">Detail</v-btn>
                <v-btn color="black" style="color:white" :to="`/myquestions/update/${data._id}`">Update</v-btn>
                <v-btn color="black" style="color:white" @click="deleteQuestions(data._id)">Delete</v-btn>
              </v-card-text>
        </v-card>
      </v-flex>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapState([
      'myQuestions',
      'baseURL'
    ])
  },
  methods: {
    ...mapActions([
      'getMyQuestions'
    ]),
    deleteQuestions (id) {
      let token = localStorage.getItem('token')
      axios({
        method: 'DELETE',
        url: `${this.baseURL}/questions/delete/${id}`,
        headers: {
          token
        }
      })
        .then((result) => {
          this.getMyQuestions()
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.getMyQuestions()
  }
}
</script>

<style>
.mylist {
  margin: 1%;
}
</style>
