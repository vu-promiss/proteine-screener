<template>
  <div class="screener">
    <b-row>
      <b-col>
        <h1>Screener</h1>
        <router-link :to="{ name: 'home', params: {} }">Back home</router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ predprob }}
      </b-col>
    </b-row>


    <template v-for="question in questions">
      <question :question="question"></question>
    </template>
      
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Question from './Question'
  // import QuestionsNavigation from './QuestionsNavigation'

  export default {
    name: 'screener',
    components: {
      Question
    },
    computed: {
      ...mapGetters({
        questions: 'quiz/questions',
        answers: 'quiz/answers',
        predprob: 'quiz/predprob'
      })
    }
  }
</script>