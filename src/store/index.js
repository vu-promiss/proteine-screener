import Vue from 'vue'
import Vuex from 'vuex'

import quiz from './modules/quiz'
import config from './modules/config'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    quiz,
    config
  }
})
