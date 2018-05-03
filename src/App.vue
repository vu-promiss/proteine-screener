<template>
  <div class="app" v-if="configLoaded">
    <navbar></navbar>
      <transition name="component-fade" mode="out-in">
          <router-view/>
      </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from 'axios'
  import Navbar from './components/Navbar'

  export default {
    name: 'app',
    components: {
      Navbar
    },
    computed: {
      ...mapGetters({
        configLoaded: 'config/configLoaded'
      })
    },
    methods: {
      ...mapActions({
        getQuestions: 'quiz/getQuestions',
        getConfig: 'config/getConfig'
      })
    },
    mounted () {
      let browserLocale = navigator.language.split('-')[0]

      this.getConfig().then(() => {
        let config = this.$store.getters['config/config']
        let loadedLocales = []
        config.locales.forEach((locale) => {
          loadedLocales.push(axios.get('locales/' + locale + '.json').then((response) => {
            this.$i18n.add(locale, response.data)
          }))
        })
        if (config.locales.includes(browserLocale)) {
          this.$i18n.set(browserLocale)
        } else {
          this.$i18n.set('en')
        }
        this.getQuestions()
      })
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
