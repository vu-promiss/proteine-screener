<template lang="html">
  <div class="quiz-navigation">
    <b-row align-h="center">
      <b-col v-if="question.type === 'info'" class="my-3" cols="12" md="6">
        <b-button
            block
            size="lg"
            @click="nextQuestion"
          >{{ $t('nav.continue') }}</b-button>
      </b-col>
      <b-col v-else class="my-3" cols="12" md="6">
        <b-button
            block
            :disabled="getSelectedAnswerValue(question.id) === undefined"
            size="lg"
            @click="nextQuestion"
          >{{ $t('nav.next_question') }}</b-button>
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
    })
  },
  methods: {
    nextQuestion () {
      this.$store.commit('quiz/setQuestionNumber', this.currentQuestionNumber + 1)
      this.$store.commit('quiz/updateCurrentQuestion')
    }
  }
}
</script>

<style lang="css">
</style>
