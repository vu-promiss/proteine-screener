import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Screener from '@/components/Screener'
import Editor from '@/components/Editor'
import Register from '@/components/Register'
import Admin from '@/components/Admin'
import Error from '@/components/Error'
import Publications from '@/components/Publications'
import Print from '@/components/Print'

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
      path: '/error',
      name: 'configerror',
      component: Error
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications
    },
    {
      path: '/print',
      name: 'print',
      component: Print
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
