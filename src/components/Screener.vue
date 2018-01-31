<template>
  <div class="screener">
    <b-row>
      <b-col>
        <h1>Screener</h1>
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
  // import QuestionsNavigation from './QuestionsNavigation'

  export default {
    name: 'screener',
    components: {
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