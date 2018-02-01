<template lang="html">
  <b-navbar class="quiz-navigation" fixed="bottom" type="dark" variant="info">
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
        href="#"
        :disabled="! nextEnabled"
        @click.prevent="nextQuestion"
      >
        {{ $t('nav.next_question') }} ›
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
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
