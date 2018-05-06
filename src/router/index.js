import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Screener from '@/components/Screener'
import Editor from '@/components/Editor'
import Register from '@/components/Register'
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
      path: '/register/:reg_id',
      props: true,
      name: 'register',
      component: Register
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
