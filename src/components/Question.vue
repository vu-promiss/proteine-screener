<template>
  <b-row class="question">
    <b-col cols="12" md="6">
      <p>{{ $t(question.title) }}</p>
    </b-col>
    <b-col cols="12" md="6">
      <b-button-group vertical style="width: 100%;">
        <b-button 
          v-for="answer in translatedAnswers"
          @click="selectedAnswer(answer)"
          variant="outline-secondary"
          :pressed="getSelectedAnswerValue(question.id) === answer.value"
          :key="answer.value"
        >
          <b-img v-if="answer.picture" block fluid :src="answer.picture"></b-img>
          {{ answer.text }}
        </b-button>
      </b-button-group>
    </b-col>
    
  </b-row>    
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['question'],
    computed: {
      ...mapGetters({
        getSelectedAnswerValue: 'quiz/getSelectedAnswer'
      }),
      translatedAnswers () {
        return this.question.answers.map((obj) => {
          return {
            text: this.$t(obj.text, {count: obj.count}, obj.count),
            value: obj.id,
            picture: obj.picture ? 'static/img/' + obj.picture + '.png' : null
          }
        })
      }
    },
    methods: {
      selectedAnswer (answer) {
        this.$store.commit('quiz/setAnswer', {
          questionId: this.question.id,
          answer: answer.value
        })
      }
    }
  }
</script>
