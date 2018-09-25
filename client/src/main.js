import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from 'vue-wysiwyg'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import GSignInButton from 'vue-google-signin-button'

Vue.config.productionTip = false
Vue.use(GSignInButton)
Vue.use(wysiwyg, {
  hideModules: { bold: true },
  forcePlainTextOnPaste: true,
  maxHeight: '100px'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
