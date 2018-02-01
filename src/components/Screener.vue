<template>
  <div class="screener">
    
    <navbar></navbar>
        
    <question v-if="currentQuestion" :question="currentQuestion"></question>
    <results v-if="currentQuestionNumber > questions.length"></results>
          
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Question from './Question'
  import Results from './Results'
  import Navbar from './Navbar'
  // import QuestionsNavigation from './QuestionsNavigation'

  export default {
    name: 'screener',
    components: {
      Navbar,
      Question,
      Results
    },
    computed: {
      ...mapGetters({
        questions: 'quiz/questions',
        currentQuestionNumber: 'quiz/currentQuestionNumber',
        currentQuestion: 'quiz/currentQuestion',
        answers: 'quiz/answers',
        predprob: 'quiz/predprob'
      })
    }
  }
</script>

<style media="screen">
  .screener { margin-top: 80px; margin-bottom:80px}
</style>