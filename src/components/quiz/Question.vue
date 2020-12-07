<template>
  <div class="question" v-hotkey="keymap">
      <b-row v-if="question.type === 'info'">
        <b-col cols="12">
          <b-alert show>{{ $t(question.id + '.text') }}</b-alert>
        </b-col>
        <b-col cols="12" class="text-center d-md-none">
          <b-button
            @click.stop="nextQuestion"
          >{{ $t('nav.continue') }}
          </b-button>
        </b-col>
      </b-row>
      <template v-if="question.type === 'bmi'">
        <bmi-question :question="question"/>
      </template>
      <b-row v-if="question.type === 'question'">
        <b-col cols="12" md="6">
          <h3> {{ $t('question_number', {number: question.number}) }} </h3>
          <p>{{ $t(question.id + '.text') }}</p>
        </b-col>
        <b-col cols="12" md="6">
          <b-button-group vertical style="width: 100%;">
            <b-button 
              v-for="answer in translatedAnswers"
              @click.stop="selectedAnswer(answer)"
              variant="outline-secondary"
              size="lg"
              :pressed="getSelectedAnswerValue(question.id) === answer.value"
              :key="answer.value"
              :id="question.id + '_' + answer.value"
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
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import QuizNavigation from './QuizNavigation'
  import BmiQuestion from './BmiQuestion'

  export default {
    props: ['question'],
    components: {
      FontAwesomeIcon,
      QuizNavigation,
      BmiQuestion
    },
    computed: {
      ...mapGetters({
        getSelectedAnswerValue: 'quiz/getSelectedAnswer',
        currentQuestionNumber: 'quiz/currentQuestionNumber'
      }),
      keymap () {
        return {
          'down': this.nextAnswer,
          'up': this.prevAnswer
        }
      },
      translatedAnswers () {
        return this.question.answers.map((obj) => {
          return {
            text: this.$t(obj.text, {count: obj.count, fraction: obj.fraction}, obj.count),
            value: obj.id,
            picture: obj.picture ? 'img/' + obj.picture + '.jpg' : null
          }
        })
      }
    },
    methods: {
      ...mapActions({
        nextQuestion: 'quiz/nextQuestion'
      }),
      nextAnswer () {
        this.moveAnswer(+1)
      },
      prevAnswer () {
        this.moveAnswer(-1)
      },
      moveAnswer (increment) {
        // Create a simple array
        let answerValueArray = this.question.answers.map((obj) => {
          return obj.id
        })
        // Get the selected answer
        let answerValue = this.getSelectedAnswerValue(this.question.id)
        let index = answerValueArray.indexOf(answerValue)
        let nextIndex = 0
        if (index !== undefined) {
          nextIndex = Math.min(Math.max(index + increment, 0), answerValueArray.length - 1)
        }
        this.selectedAnswer({value: answerValue = answerValueArray[nextIndex]})
        this.$scrollTo(
          'button#' + this.question.id + '_' + answerValue,
          300,
          {
            offset: -100
          }
        )
      },
      selectedAnswer (answer) {
        this.$store.commit('quiz/setAnswer', {
          questionId: this.question.id,
          answer: answer.value
        })
      }
    }
  }
</script>

<style media="screen">
</style>