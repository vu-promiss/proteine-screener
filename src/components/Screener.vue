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
      <img-question v-if="question.type == 'picture'" :question="question"></img-question>
      <question v-if="question.type == 'text'" :question="question"></question>
      {{ question.type }}
    </template>
      
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ImgQuestion from './ImgQuestion'
  import Question from './Question'
  // import QuestionsNavigation from './QuestionsNavigation'

  export default {
    name: 'screener',
    components: {
      Question,
      ImgQuestion
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