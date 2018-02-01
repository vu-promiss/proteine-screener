<template lang="html">
  <div class="results">
    <b-row align-h="center">
      <b-col cols="12" md="6" class="text-center">
        <b-alert show >Predicted Probability: <h1>{{ predprob | decimal }}</h1></b-alert>
        <b-button size="lg" @click="startOver">{{ $t('nav.start_over') }}</b-button>
      </b-col>
    </b-row>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      predprob: 'quiz/predprob'
    })
  },
  methods: {
    startOver () {
      this.$store.commit('quiz/resetAnswers')
      this.$store.commit('quiz/setQuestionNumber', 1)
      this.$store.commit('quiz/updateCurrentQuestion')
    }
  }
}
</script>

<style lang="css">
</style>
