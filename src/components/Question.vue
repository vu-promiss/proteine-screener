<template>
  <b-row class="question">
    <template v-if="question.type === 'info'">
      <b-col cols="12">
        <b-alert show>{{ $t(question.id + '.text') }}</b-alert>
      </b-col>
    </template>

    <template v-else>
      <b-col cols="12" md="6">
        <p>{{ $t(question.id + '.text') }}</p>
      </b-col>
      <b-col cols="12" md="6">
        <b-button-group vertical style="width: 100%;">
          <b-button 
            v-for="answer in translatedAnswers"
            @click="selectedAnswer(answer)"
            variant="outline-secondary"
            size="lg"
            :pressed="getSelectedAnswerValue(question.id) === answer.value"
            :key="answer.value"
          >
            <b-img v-if="answer.picture" block fluid :src="answer.picture"></b-img>
            {{ answer.text }}
            <font-awesome-icon 
              icon="check-circle"
              v-if="getSelectedAnswerValue(question.id) === answer.value"
            />
          </b-button>
        </b-button-group>
      </b-col>
    </template>
    <b-col>
      <b-button
          @click="nextQuestion"
        >Ok</b-button>
    </b-col>
  </b-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  export default {
    props: ['question'],
    components: {
      FontAwesomeIcon
    },
    computed: {
      ...mapGetters({
        getSelectedAnswerValue: 'quiz/getSelectedAnswer',
        currentQuestionNumber: 'quiz/currentQuestionNumber'
      }),
      translatedAnswers () {
        return this.question.answers.map((obj) => {
          // let text = this.$t(obj.text)
          // if (true) text = this.$t(obj.text, {count: obj.count}, obj.count)
          return {
            text: this.$t(obj.text, {count: obj.count, fraction: obj.fraction}, obj.count),
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
      },
      nextQuestion () {
        this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber + 1)
        this.$store.commit('quiz/updateCurrentQuestion')
      }

    }
  }
</script>
