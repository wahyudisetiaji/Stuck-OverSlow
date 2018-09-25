<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="900">
      <v-btn slot="activator" color="black" style="color:white">Update</v-btn>
      <v-card>
        <div>
            <v-container grid-list-xs>
            <v-flex xs12>
                <v-card>
                <v-container grid-list-xs>
                    <v-form ref="form">
                    <h2>Update Answer</h2>
                    <wysiwyg v-model="dataAnswer.answer" label="Answer" required></wysiwyg>
                    <v-btn color="black" style="color:white" @click="updateAnswer(dataAnswer)">Submit</v-btn>
                    <v-btn color="black" style="color:white" @click="dialog = false">Back</v-btn>
                    </v-form>
                </v-container>
                </v-card>
            </v-flex>
            </v-container>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  props: ['dataAnswer'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    updateAnswer (data) {
      let id = this.$route.params.id
      let token = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/updateanswer/${id}`,
        headers: {
          token
        },
        data: {
          idAnswer: data._id,
          answer: data.answer
        }
      })
        .then((result) => {
          this.dialog = false
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  computed: {
    ...mapState([
      'baseURL'
    ])
  }
}
</script>

<style>

</style>
