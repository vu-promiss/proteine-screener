<template>
  <div class="question">
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
      <b-row v-if="question.type === 'question'">
        <b-col cols="12" md="6">
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
      nextQuestion () {
        this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber + 1)
        this.$store.commit('quiz/updateCurrentQuestion')
      },
      selectedAnswer (answer) {
        this.$store.commit('quiz/setAnswer', {
          questionId: this.question.id,
          answer: answer.value
        })

        if (this.$store.getters['quiz/autoNext'] === '1') {
          this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber + 1)
          setTimeout(() => {
            this.$store.commit('quiz/updateCurrentQuestion')
          }, 300)
        }
      }
    }
  }
</script>

<style media="screen">
</style>