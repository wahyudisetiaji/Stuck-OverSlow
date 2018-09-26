import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
const api = 'https://stuck-over.wahyudisetiaji.xyz'
// const api = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: api,
    token: false,
    username: '',
    message: '',
    myQuestions: '',
    oneQuestions: '',
    oneAnswer: '',
    allQuestions: '',
    allAnswer: '',
    news: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUsername (state, payload) {
      state.username = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setMyQuestions (state, payload) {
      state.myQuestions = payload
    },
    setOneQuestions (state, payload) {
      state.oneQuestions = payload
    },
    setOneAnswer (state, payload) {
      state.oneAnswer = payload
    },
    setAllQuestions (state, payload) {
      state.allQuestions = payload
    },
    setAllAnswer (state, payload) {
      state.allAnswer = payload
    },
    setNews (state, payload) {
      state.news = payload
    }
  },
  actions: {
    logout (context) {
      context.commit('setToken', false)
      localStorage.clear()
      router.push('/')
    },
    googleSignIn (context, data) {
      axios({
        method: 'POST',
        url: `${api}/users/google`,
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          context.commit('setToken', true)
          let token = result.data.data.token
          localStorage.setItem('token', token)
          router.push('/')
        })
        .catch((err) => {
          if (err.response.data.message) {
            context.commit('setMessage', 'Email/Password wrong !')
          }
        })
    },
    register (context, data) {
      axios({
        method: 'POST',
        url: `${api}/users/register`,
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          router.push('/join/login')
        })
        .catch((err) => {
          if (err.response.data.message) {
            context.commit('setMessage', 'Account already exists !')
          }
        })
    },
    login (context, data) {
      axios({
        method: 'POST',
        url: `${api}/users/login`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          let token = result.data.data.token
          let username = result.data.data.username
          context.commit('setToken', true)
          context.commit('setUsername', username)
          localStorage.setItem('username', username)
          localStorage.setItem('token', token)
          router.push('/')
        })
        .catch((err) => {
          if (err.response.data.message) {
            context.commit('setMessage', 'Email/Password wrong !')
          }
        })
    },
    getMyQuestions (context, payload) {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `${api}/questions/me`,
        headers: {
          token
        }
      })
        .then((result) => {
          let data = result.data.result
          context.commit('setMyQuestions', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getOneQuestions (context, id) {
      axios({
        method: 'GET',
        url: `${api}/questions/question/${id}`
      })
        .then((result) => {
          let data = result.data.result[0]
          let answer = result.data.result[0].answer
          context.commit('setAllAnswer', answer)
          context.commit('setOneQuestions', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getAllQuestions (context, payload) {
      axios({
        method: 'GET',
        url: `${api}/questions`
      })
        .then((result) => {
          let data = result.data.result
          context.commit('setAllQuestions', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getAllCategory (context, category) {
      axios({
        method: 'GET',
        url: `${api}/questions/${category}`
      })
        .then((result) => {
          let data = result.data.result
          context.commit('setAllQuestions', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getNews (context, payload) {
      axios({
        method: 'GET',
        url: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f86e8c1e316c415eb6db1152961ad690`
      })
        .then((result) => {
          let data = result.data.articles
          context.commit('setNews', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
})
