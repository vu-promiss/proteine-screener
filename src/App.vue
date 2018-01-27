<template>
  <b-container style="max-width: 900px">
    <img src="./assets/logo_promiss.png">
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
        getQuestions: 'quiz/getQuestions'
      })
    },
    mounted () {
      this.getQuestions()
      // this should be somewhere else, but where?
      axios.get('static/locales/en.json').then((response) => {
        this.$i18n.add('en', response.data)
      })
      axios.get('static/locales/nl.json').then((response) => {
        this.$i18n.add('nl', response.data)
      })

      this.$i18n.set('en')
    }
  }
</script>
