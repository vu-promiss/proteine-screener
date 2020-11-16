<template lang="html">
  <div class="results">
    <b-row align-h="center">
      <b-col cols="12" md="6" class="text-center">
        <b-alert show >
          {{ $t('results.predicted_probability') }}:
          <h1>{{ predprob * 100 | integer }}%</h1>
          <p>{{ $t('results.paragraph1', {cutoff: cutoffPercentage}) }}</p>
          <p>{{ $t('results.paragraph2') }}</p>
          <p v-if="debug">
            <b-btn v-b-modal.modal1>Show recoded values</b-btn>
          </p>
        </b-alert>
        <b-button
          size="lg"
          @click="startOver">
          {{ $t('nav.start_over') }}
        </b-button>
      </b-col>
    </b-row>
    <b-modal ok-only id="modal1" title="Recoded values">
      <b-table striped hover :items="recodedAnswersArray"></b-table>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  mounted () {
    // send results to api
    axios.post(this.storeResultsEndpoint, {
      unique_id: this.unique_id,
      reg_id: this.reg_id,
      pred_prob: this.predprob,
      answers: this.answers
    })
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  computed: {
    ...mapGetters({
      predprob: 'quiz/predprob',
      debug: 'config/debug',
      cutoff: 'config/cutoff',
      storeResultsEndpoint: 'config/storeResultsEndpoint',
      unique_id: 'quiz/unique_id',
      reg_id: 'quiz/reg_id',
      answers: 'quiz/answers',
      cutoffPercentage: 'config/cutoffPercentage',
      recodedAnswers: 'quiz/recodedAnswers'
    }),
    recodedAnswersArray () {
      return Object.entries(this.recodedAnswers).map(obj => {
        return {Recoded: obj[0], value: obj[1]}
      })
    }
  },
  methods: {
    startOver () {
      this.$store.commit('quiz/resetAnswers')
      this.$store.commit('quiz/setQuestionNumber', 1)
      this.$store.commit('quiz/updateCurrentQuestion')
      this.$store.commit('quiz/setRegId', '')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="css">
</style>
