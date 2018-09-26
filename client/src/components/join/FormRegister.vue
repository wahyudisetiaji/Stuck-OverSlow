<template>
    <div>
        <v-card class="register">
            <h1>Register</h1>
            <v-divider class="my-3"></v-divider>
            <h3 v-if="true">{{message}}</h3>
            <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false">
                <v-text-field label="Username" :rules="usernameRules" v-model="username" required></v-text-field>
                <v-text-field label="E-mail" :rules="emailRules" v-model="email" required></v-text-field>
                <v-text-field type="password" :rules="passwordRules" :counter="5" label="Password" v-model="password" required></v-text-field>
                <v-btn color="black" style="color:white" type="submit" :disabled="!valid" @click="submit">Register</v-btn>
                <v-btn color="black" style="color:white" @click="clear">Clear</v-btn>
            </v-form>
            <v-divider class="my-3"></v-divider>
            <div>
                <p style="color:black">Do you have account ? <span><router-link to="/join/login">Login</router-link></span></p>
                 <g-signin-button class="btn" style="color:white; background-color:blue"
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    Sign in with Google
                 </g-signin-button>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'Username is required'
    ],
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
    notif: false,
    googleSignInParams: {
      client_id: '444358458118-gkb1cc48fd6ugs2rt7s7edp0ubd1r23r.apps.googleusercontent.com'
    }
  }),
  computed: {
    ...mapState([
      'message'
    ])
  },
  methods: {
    ...mapActions([
      'register',
      'googleSignIn'
    ]),
    onSignInSuccess (googleUser) {
      let profile = googleUser.getBasicProfile()
      let obj = {
        username: profile.ofa,
        email: profile.U3,
        password: profile.wea
      }
      this.googleSignIn(obj)
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    submit () {
      if (this.$refs.form.validate()) {
        let obj = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        this.register(obj)
      }
    },
    clear () {
      this.$refs.form.reset()
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
.register {
  padding: 20px;
  color: black;
}
</style>
