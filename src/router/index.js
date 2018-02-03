import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Screener from '@/components/Screener'
import Editor from '@/components/Editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/screener',
      name: 'screener',
      component: Screener
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})
