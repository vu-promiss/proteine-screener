<template>
  <div class="screener">
    <b-container>
      <div v-if="currentQuestion">
        <b-row>
          <b-col>
            <b-progress 
              :value="currentQuestionNumber" 
              :max="totalQuestions + 1" 
              class="mb-3"
              variant="info"
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
    </b-container>

    <quiz-navigation-fixed v-if="currentQuestion" :question="currentQuestion"></quiz-navigation-fixed>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Question from './quiz/Question'
  import Results from './Results'
  import QuizNavigation from './quiz/QuizNavigation'
  import QuizNavigationFixed from './quiz/QuizNavigationFixed'

  export default {
    name: 'screener',
    props: ['stakeholder'],
    mounted () {
      this.updateStakeholder(this.stakeholder)
      this.initQuiz()
    },
    components: {
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
      ...mapActions({
        initQuiz: 'quiz/initQuiz',
        updateStakeholder: 'config/updateStakeholder'
      }),
      scrollup () {
        this.$scrollTo('body')
      }
    }
  }
</script>

<style media="screen">
</style>