<template>
    <div>
        <v-card class="login">
            <h1>Login</h1>
            <v-divider class="my-3"></v-divider>
            <h3 v-if="true">{{message}}</h3>
            <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false">
                <v-text-field label="E-mail" :rules="emailRules" v-model="email" required></v-text-field>
                <v-text-field type="password" :rules="passwordRules" :counter="5" v-model="password" label="Password" required></v-text-field>
                <v-btn color="black" style="color:white" type="submit" :disabled="!valid" @click="submit">Login</v-btn>
                <v-btn color="black" style="color:white" @click="clear">Clear</v-btn>
            </v-form>
            <v-divider class="my-3"></v-divider>
            <div>
                <p>Don't have account ? <span><router-link to="/join">Register</router-link></span></p>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must be more than 5 characters'
      ],
      notif: false
    }
  },
  computed: {
    ...mapState([
      'message'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    submit () {
      if (this.$refs.form.validate()) {
        let obj = {
          email: this.email,
          password: this.password
        }
        this.login(obj)
      }
    },
    clear () {
      this.$refs.form.reset()
      this.notif = false
      this.$store.state.message = ''
    }
  },
  watch: {
    message: function (newData, oldDta) {
      if (newData) {
        this.notif = true
      }
    }
  }
}
</script>

<style>
.login {
  padding: 25px;
  color: black;
}
</style>
