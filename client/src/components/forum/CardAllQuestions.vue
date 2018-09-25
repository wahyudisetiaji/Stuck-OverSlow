<template>
    <div>
        <v-flex xs12 v-for="(data, index) in allQuestions" :key="index">
            <v-card class="questions">
                <v-card-text>
                    <div>
                        <h2 class="mb-0">{{data.title}}</h2><br>
                        <div v-html="data.questions"></div>
                    </div>
                </v-card-text>
                <v-card-text>
                    <h5 class="caption">Questions on {{ moment(data.createdAt).format("dddd, MMMM Do YYYY, h:mm") }} WIB, by {{data.userId.username}}</h5>
                    <v-btn color="black" style="color:white" :to="`/forum/detail/${data._id}`">Answer</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapState([
      'allQuestions'
    ])
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ]),
    moment: function (date) {
      return moment(date)
    }
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style>
.questions {
  margin: 2%;
}
</style>
