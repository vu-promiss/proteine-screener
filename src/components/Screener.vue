<template>
  <div class="screener">
    
    <navbar></navbar>
    <transition name="component-fade" mode="out-in" v-on:enter="scrollup">
      <div v-if="currentQuestion" v-bind:key="currentQuestion.id">
        <question v-if="currentQuestion" :question="currentQuestion"></question>
        <quiz-navigation v-if="currentQuestion" :question="currentQuestion"></quiz-navigation>
      </div>
      <results v-if="currentQuestionNumber > questions.length"></results>
    </transition>

    <quiz-navigation-fixed v-if="currentQuestion" :question="currentQuestion"></quiz-navigation-fixed>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Question from './Question'
  import Results from './Results'
  import Navbar from './Navbar'
  import QuizNavigation from './QuizNavigation'
  import QuizNavigationFixed from './QuizNavigationFixed'

  export default {
    name: 'screener',
    components: {
      Navbar,
      Question,
      QuizNavigation,
      QuizNavigationFixed,
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
    },
    methods: {
      scrollup () {
        this.$scrollTo('body')
      }
    }
  }
</script>

<style media="screen">
  .screener { margin-top: 80px; margin-bottom:80px}
</style>