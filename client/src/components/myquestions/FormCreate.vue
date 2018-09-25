<template>
    <div>
        <v-container grid-list-xs>
        <v-flex xs12>
            <v-card>
            <v-container grid-list-xs>
                <v-form ref="form" v-model="valid" lazy-validation>
                <h2>Create Questions</h2>
                <h4 v-if="notif">{{message}}</h4>
                <v-text-field v-model="title" :rules="titleRules" label="Title" required></v-text-field><br>
                <wysiwyg v-model="questions" :rules="questionsRules" label="Questions" required></wysiwyg>
                <label for="category">Select Category</label>
                <select class="custom-select" v-model="category">
                        <option category="Javascript">Javascript</option>
                        <option category="Python">Python</option>
                        <option category="Java">Java</option>
                        <option category="PHP">PHP</option>
                </select><br><br>
                <v-btn color="black" style="color:white" :disabled="!valid" @click="submit">Submit</v-btn>
                <v-btn color="black" style="color:white" @click="clear">Clear</v-btn>
                </v-form>
            </v-container>
            </v-card>
        </v-flex>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data: () => ({
    valid: true,
    title: '',
    titleRules: [
      v => !!v || 'Title is required'
    ],
    questions: '',
    questionsRules: [
      v => !!v || 'Questions is required'
    ],
    category: '',
    notif: false,
    message: ''
  }),
  computed: {
    ...mapState([
      'baseURL'
    ])
  },
  methods: {
    submit () {
      let token = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: `${this.baseURL}/questions/create`,
        headers: {
          token
        },
        data: {
          title: this.title,
          questions: this.questions,
          category: this.category
        }
      })
        .then((result) => {
          this.$router.push('/myquestions')
        })
        .catch((err) => {
          if (err.response.data.message) {
            this.notif = true
            this.message = 'Title/Questions is Required !'
          }
        })
    },
    clear () {
      this.title = ''
      this.questions = ''
      this.message = ''
      this.category = ''
    }
  }
}
</script>

<style>

</style>
