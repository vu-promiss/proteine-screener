// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import BootstrapVue from 'bootstrap-vue'
import VueScrollTo from 'vue-scrollto'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import fontawesome from '@fortawesome/fontawesome'
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle'

fontawesome.library.add(faCheckCircle)

const locale = new Vuex.Store()
Vue.use(vuexI18n.plugin, locale)
Vue.use(BootstrapVue)
Vue.use(VueScrollTo)
Vue.i18n.set('en')
Vue.config.productionTip = false
Vue.filter('decimal', function (value) {
  return value.toFixed(2)
})
Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})
Vue.filter('integer', function (value) {
  return parseInt(value, 10)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
