<template>
  <div class="app">
    <navbar></navbar>
      <transition name="component-fade" mode="out-in">
          <router-view/>
      </transition>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import axios from 'axios'
  import Navbar from './components/Navbar'

  export default {
    name: 'app',
    components: {
      Navbar
    },
    methods: {
      ...mapActions({
        getQuestions: 'quiz/getQuestions',
        getConfig: 'config/getConfig'
      })
    },
    mounted () {
      this.getConfig().then(() => {
        let config = this.$store.getters['config/config']
        let loadedLocales = []
        config.locales.forEach((locale) => {
          loadedLocales.push(axios.get('locales/' + locale + '.json').then((response) => {
            this.$i18n.add(locale, response.data)
          }))
        })
        this.getQuestions()
      })
      // fixme: make dynamic
      this.$i18n.set('en')
    }
  }
</script>

<style>
  .app { margin-top: 80px; margin-bottom:80px}

  .component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s;
  }
  .component-fade-enter, .component-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>
