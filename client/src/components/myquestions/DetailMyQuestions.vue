<template>
    <div>
        <v-flex xs12>
            <v-card>
                <v-card-text>
                    <div>
                        <h2 class="mb-0">{{oneQuestions.title}}</h2><br>
                        <div id="content" v-html="oneQuestions.questions"></div>
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-btn color="black" style="color:white" :to="`/myquestions/update/${oneQuestions._id}`">Update</v-btn>
                    <v-btn color="black" style="color:white" to="/myquestions">Back</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'getOneQuestions'
    ])
  },
  computed: {
    ...mapState([
      'oneQuestions',
      'baseURL'
    ]),
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
  }
}
</script>

<style>

</style>
