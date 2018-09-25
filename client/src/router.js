import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Forum from './views/Forum.vue'
import MyQuestions from './views/MyQuestions.vue'
import News from './views/News.vue'
import Join from './views/Join.vue'
import FormRegister from '@/components/join/FormRegister.vue'
import FormLogin from '@/components/join/FormLogin.vue'
import CardMyQuestions from '@/components/myquestions/CardMyQuestions.vue'
import FormCreate from '@/components/myquestions/FormCreate.vue'
import FormUpdate from '@/components/myquestions/FormUpdate.vue'
import DetailMyQuestions from '@/components/myquestions/DetailMyQuestions.vue'
import CardAllQuestions from '@/components/forum/CardAllQuestions.vue'
import DetailAllQuestions from '@/components/forum/DetailAllQuestions.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum,
      children: [
        {
          path: '/forum',
          name: 'allquestions',
          component: CardAllQuestions
        },
        {
          path: '/forum/detail/:id',
          name: 'detailallquestions',
          component: DetailAllQuestions
        }
      ]
    },
    {
      path: '/myquestions',
      name: 'myquestions',
      component: MyQuestions,
      children: [
        {
          path: '/myquestions',
          name: 'cardmyquestions',
          component: CardMyQuestions
        },
        {
          path: '/myquestions/create',
          name: 'create',
          component: FormCreate
        },
        {
          path: '/myquestions/update/:id',
          name: 'update',
          component: FormUpdate
        },
        {
          path: '/myquestions/detail/:id',
          name: 'detail',
          component: DetailMyQuestions
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      children: [
        {
          path: '/join',
          name: 'register',
          component: FormRegister
        },
        {
          path: '/join/login',
          name: 'login',
          component: FormLogin
        }
      ]
    }
  ]
})
