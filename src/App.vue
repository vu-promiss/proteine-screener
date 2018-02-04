<template>
  <b-container style="max-width: 900px">
    <transition name="component-fade" mode="out-in">
        <router-view/>
    </transition>
  </b-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'app',
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
          loadedLocales.push(axios.get('static/locales/' + locale + '.json').then((response) => {
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
  .component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s;
  }
  .component-fade-enter, .component-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>
