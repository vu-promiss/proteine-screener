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

<style>
  .component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s;
  }
  .component-fade-enter, .component-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>
