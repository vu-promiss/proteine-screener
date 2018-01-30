<template>
  <b-row class="question">
    <b-col cols="12" md="6">
      <p>{{ $t(question.title) }}</p>
    </b-col>
    <b-col cols="12" md="6">
      <b-button 
        v-for="answer in translatedAnswers"
        @click="selectedAnswer(answer)"
        variant="outline-secondary"
        :pressed="activeAnswer === answer.value"
        :key="answer.value"
      ><b-img block fluid :src="answer.picture"></b-img>{{ answer.text }}</b-button>
    </b-col>
    
  </b-row>    
</template>

<script>
  export default {
    data () {
      return {
        activeAnswer: null
      }
    },
    props: ['question'],
    computed: {
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
        this.activeAnswer = answer.value
      }
    }
  }
</script>
