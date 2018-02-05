<template lang="html">
  <div class="quiz-navigation-fixed">
    <b-navbar class="quiz-navigation d-md-none" fixed="bottom" type="dark" variant="info">
      <div class="container d-flex justify-content-between">
        <b-navbar-nav>
          <b-nav-item
            :disabled="! prevEnabled"
            @click.prevent="prevQuestion"
          >
            ‹ {{ $t('nav.prev_question') }}
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item
            :disabled="! nextEnabled"
            @click.prevent="nextQuestion"
          >
            {{ $t('nav.next_question') }} ›
          </b-nav-item>
        </b-navbar-nav>
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
    ...mapActions({
      nextQuestion: 'quiz/nextQuestion',
      prevQuestion: 'quiz/prevQuestion'
    })
  }
}
</script>

<style lang="css">
</style>
