<template>
  <div class="screener">
    
    <navbar></navbar>
    <div v-if="currentQuestion" v-bind:key="currentQuestion.id">
      <b-row>
        <b-col>
          <b-progress 
            :value="currentQuestionNumber" 
            :max="totalQuestions + 1" 
            class="mb-3"
            variant="info"
            show-value
          ></b-progress>
        </b-col>
      </b-row>
    </div>
    <transition name="component-fade" mode="out-in" v-on:enter="scrollup">
      <div v-if="currentQuestion" v-bind:key="currentQuestion.id">
        <question v-if="currentQuestion" :question="currentQuestion"></question>
        <quiz-navigation v-if="currentQuestion" :question="currentQuestion"></quiz-navigation>
      </div>
      <div v-else>
        <results v-if="currentQuestionNumber > questions.length"></results>
      </div>
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
        totalQuestions: 'quiz/totalQuestions',
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