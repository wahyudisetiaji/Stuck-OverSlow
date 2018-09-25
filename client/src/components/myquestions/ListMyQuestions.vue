<template>
    <v-flex xs12>
        <v-card class="list">
            <v-card-text>
                <h2 class="mb-0">List My Questions</h2>
                <div v-for="(data, index) in myQuestions" :key="index">
                    <v-flex xs12>
                        <v-btn color="black" style="color:white" :to="`/myquestions/detail/${data._id}`">{{data.title}}</v-btn>
                    </v-flex>
                </div>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'myQuestions'
    ])
  },
  methods: {
    ...mapActions([
      'getMyQuestions'
    ])
  },
  created () {
    this.getMyQuestions()
  }
}
</script>

<style>
.list {
  margin: 2%;
}
</style>
