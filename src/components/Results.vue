<template lang="html">
  <div class="results">
    <b-row align-h="center">
      <b-col cols="12" md="6" class="text-center">
        <b-alert show >
          Predicted Probability: 
          <h1>{{ predprob | decimal }}</h1>
          <p v-if="predprob < cutoff"> {{ $t("sufficient_protein_intake") }} </p>
          <p v-else> {{ $t("low_protein_intake") }} </p>
        </b-alert>
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
      predprob: 'quiz/predprob',
      cutoff: 'config/cutoff'
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
