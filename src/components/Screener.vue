<template>
  <div class="screener">
    <navbar></navbar>
    <b-row>
      <b-col>
        <router-link :to="{ name: 'home' }">Back home</router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ answers }}
      </b-col>
      <b-col>
        Predprob: {{ predprob }}
      </b-col>
    </b-row>


    <template v-for="question in questions">
      <info-question v-if="question.type == 'info'" :question="question"></info-question>
      <question v-else :question="question"></question>
    </template>
      
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import InfoQuestion from './InfoQuestion'
  import Question from './Question'
  import Navbar from './Navbar'
  // import QuestionsNavigation from './QuestionsNavigation'

  export default {
    name: 'screener',
    components: {
      Navbar,
      Question,
      InfoQuestion
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

<style media="screen">
  .screener { margin-top: 80px}
</style>