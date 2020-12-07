<template lang="html">
  <div class="quiz-navigation" v-hotkey="keymap">
    <b-row class="d-none d-md-block" v-bind:key="question.id">
      <b-col class="my-3 text-center">
        <b-button-group class="mx-1">
          <b-button
            :disabled="! prevEnabled"
            @click.stop="prevQuestion"
          >‹ {{ $t('nav.previous') }}
          </b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button
            :disabled="! nextEnabled"
            @click.stop="nextQuestion"
          >{{ $t('nav.next') }} ›
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
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
    },
    keymap () {
      // Only enter key in BMI question
      if (this.question.type === 'bmi') {
        return {'enter': this.nextWhenEnabled}
      }
      return {
        'enter': this.nextWhenEnabled,
        'right': this.nextWhenEnabled,
        'left': this.prevWhenEnabled
      }
    }
  },
  methods: {
    ...mapActions({
      nextQuestion: 'quiz/nextQuestion',
      prevQuestion: 'quiz/prevQuestion'
    }),
    nextWhenEnabled () {
      if (this.nextEnabled) { this.nextQuestion() }
    },
    prevWhenEnabled () {
      if (this.prevEnabled) { this.prevQuestion() }
    }
  }
}
</script>

<style lang="css">
</style>
