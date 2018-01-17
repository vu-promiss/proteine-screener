<template>
  <div class="hello">
    <h1>Screener</h1>
    <router-link :to="{ name: 'home', params: {} }">Back home</router-link>
    
    <div class="col-sm-4" v-for="question in questions">
      <question :question="question"></question>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Question from './Question'

  export default {
    name: 'screener',
    components: {
      Question
    },
    computed: {
      ...mapGetters({
        questions: 'quiz/questions'
      })
    }
  }
</script>