<template>
  <div class="question">
    <transition name="question-fade" mode="out-in">
      <b-row v-if="question.type === 'info'">
        <b-col cols="12">
          <b-alert show>{{ $t(question.id + '.text') }}</b-alert>
        </b-col>
      </b-row>
    </transition>
    <transition name="question-fade" mode="out-in">
      <b-row v-if="question.type === 'question'" v-bind:key="question.id">
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
      </b-row>
    </transition>
    <quiz-navigation :question="question"></quiz-navigation>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import QuizNavigation from './QuizNavigation'
  export default {
    props: ['question'],
    components: {
      FontAwesomeIcon,
      QuizNavigation
    },
    computed: {
      ...mapGetters({
        getSelectedAnswerValue: 'quiz/getSelectedAnswer',
        currentQuestionNumber: 'quiz/currentQuestionNumber'
      }),
      translatedAnswers () {
        return this.question.answers.map((obj) => {
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
        // this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber + 1)
        // this.$store.commit('quiz/updateCurrentQuestion')
      }
    }
  }
</script>

<style media="screen">
.question-fade-enter-active, .component-fade-leave-active {
transition: opacity .5s;
}
.question-fade-enter, .component-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
opacity: 0;
}
</style>