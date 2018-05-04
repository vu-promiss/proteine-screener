import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Screener from '@/components/Screener'
import Editor from '@/components/Editor'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/screener/:question',
      name: 'screener',
      component: Screener
    },
    {
      path: '/register/:reg_number',
      name: 'register',
      component: Screener
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
