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
  import yaml from 'js-yaml'
  import Navbar from './components/navigation/Navbar'

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
        loadYamlConfig: 'config/loadYamlConfig',
        setConfig: 'config/setConfig',
        storeLocaleData: 'config/storeLocaleData',
        updateLocale: 'config/updateLocale'
      })
    },
    mounted () {
      let browserLocale = navigator.language.split('-')[0]

      this.loadYamlConfig().then(() => {
        let locales = this.$store.getters['config/locales']
        let loadedLocales = []
        locales.forEach((locale) => {
          let self = this
          loadedLocales.push(axios.get('locales/' + locale + '.yaml').then((response) => {
            let localeData = yaml.safeLoad(response.data)
            self.storeLocaleData({locale: locale, localeData: localeData})
            this.$i18n.add(locale, localeData)
          }))
        })
        Promise.all(loadedLocales).then((reponse) => {
          if (locales.includes(browserLocale)) {
            this.updateLocale(browserLocale)
          } else if (locales.includes('en')) {
            this.updateLocale('en')
          } else {
            this.updateLocale(locales[0])
          }
        })
        this.getQuestions()
      }).catch((error) => {
        console.log(error)
        this.setConfig({locales: ['en']})
        this.$router.push({ name: 'configerror' })
      })
    }
  }
</script>

<style>
  @media screen {
    .app { margin-top: 80px; margin-bottom:80px}
  }

  .component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s;
  }
  .component-fade-enter, .component-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>
