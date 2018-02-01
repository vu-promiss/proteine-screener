<template lang="html">
  <div class="quiz-navigation">
    <b-row align-h="center">
      <b-col class="my-3" cols="12" md="6">
        <b-button-group>
          <b-button
              size="lg"
              :disabled="! prevEnabled"
              @click="prevQuestion"
          >
            {{ $t('nav.prev_question') }}
          </b-button>
          <b-button
              :disabled="! nextEnabled"
              size="lg"
              @click="nextQuestion"
          >
            {{ $t('nav.next_question') }}
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: [
    'question'
  ],
  computed: {
    ...mapGetters({
      getSelectedAnswerValue: 'quiz/getSelectedAnswer',
      currentQuestionNumber: 'quiz/currentQuestionNumber'
    }),
    nextEnabled () {
      if (this.question.type === 'info') return true
      return this.getSelectedAnswerValue(this.question.id) !== undefined
    },
    prevEnabled () {
      return this.currentQuestionNumber > 1
    }
  },
  methods: {
    nextQuestion () {
      this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber + 1)
      this.$store.commit('quiz/updateCurrentQuestion')
    },
    prevQuestion () {
      this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber - 1)
      this.$store.commit('quiz/updateCurrentQuestion')
    }
  }
}
</script>

<style lang="css">
</style>
