<template lang="html">
  <div class="quiz-navigation-fixed">
    <b-navbar class="quiz-navigation d-md-none" toggleable="md" fixed="bottom" type="dark" variant="info">
      <div class="container d-flex justify-content-between">
        <b-nav-form>
          <b-button
            :disabled="! prevEnabled"
            variant="outline-light"
            size="sm"
            @click.prevent="prevQuestion"
          >
            ‹ {{ $t('nav.previous') }}
          </b-button>
        </b-nav-form>
        <b-nav-form>
          <b-button
            :disabled="! nextEnabled"
            variant="outline-light"
            size="sm"
            @click.prevent="nextQuestion"
          >
            {{ $t('nav.next') }} ›
          </b-button>
        </b-nav-form>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: [
    'question'
  ],
  computed: {
    ...mapGetters({
      getSelectedAnswerValue: 'quiz/getSelectedAnswer',
      currentQuestionNumber: 'quiz/currentQuestionNumber',
      validBmi: 'quiz/validBmi'
    }),
    nextEnabled () {
      if (this.question.type === 'info') return true
      if (this.question.type === 'bmi') return this.validBmi
      return this.getSelectedAnswerValue(this.question.id) !== undefined
    },
    prevEnabled () {
      return this.currentQuestionNumber > 1
    }
  },
  methods: {
    ...mapActions({
      nextQuestion: 'quiz/nextQuestion',
      prevQuestion: 'quiz/prevQuestion'
    })
  }
}
</script>

<style lang="css">
</style>
