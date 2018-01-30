<template>
  <b-row class="question">
    <b-col cols="12" md="6">
      <h3>{{ $t(question.title) }}</h3>
    </b-col>
    <b-col cols="12" md="6">
        <b-card v-for="answer in translatedAnswers"
          :img-src="answer.picture"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
          <p class="card-text">
            <b-form-radio value="first">{{ answer.text }}</b-form-radio>
          </p>
      </b-card>
    </b-col>
  </b-row>    
</template>

<script>
  export default {
    data () {
      return {
        answer: null
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
          answer: answer
        })
      }
    }
  }
</script>
