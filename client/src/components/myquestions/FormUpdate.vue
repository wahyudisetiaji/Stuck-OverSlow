<template>
     <div>
        <v-container grid-list-xs>
        <v-flex xs12>
            <v-card>
            <v-container grid-list-xs>
                <v-form ref="form">
                <h2>Update Questions</h2>
                <v-text-field v-model="oneQuestions.title" label="Title" required></v-text-field><br>
                <wysiwyg v-model="oneQuestions.questions" label="Questions" required></wysiwyg>
                <label for="category">Select Category</label>
                    <select class="custom-select" v-model="oneQuestions.category">
                        <option category="Javascript">Javascript</option>
                        <option category="Python">Python</option>
                        <option category="Java">Java</option>
                        <option category="PHP">PHP</option>
                    </select><br><br>
                <v-btn color="black" style="color:white" @click="update(oneQuestions)">Submit</v-btn>
                <v-btn color="black" style="color:white" to="/myquestions">Back</v-btn>
                </v-form>
            </v-container>
            </v-card>
        </v-flex>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  methods: {
    ...mapActions([
      'getOneQuestions'
    ]),
    update (data) {
      let id = this.$route.params.id
      let token = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `${this.baseURL}/questions/update/${id}`,
        headers: {
          token
        },
        data: {
          title: data.title,
          questions: data.questions,
          category: data.category
        }
      })
        .then((result) => {
          this.$router.push('/myquestions')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  computed: {
    ...mapState([
      'oneQuestions',
      'baseURL'
    ])
  },
  created () {
    let id = this.$route.params.id
    this.getOneQuestions(id)
  }
}
</script>

<style>

</style>
