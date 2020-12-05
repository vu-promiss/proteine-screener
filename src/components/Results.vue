<template lang="html">
  <div class="results">
    <b-row align-h="center">
      <b-col cols="12" md="6" class="text-left">
        <b-alert show v-if="stakeholder == 'professional'">
          <h3>{{ $t('results.professionals.probability', {percentage: parseInt(predprob * 100)})  }}</h3>

          <div v-html="renderLocale('results.professionals.explanation')"></div>

          <div v-html="renderLocale('results.professionals.target')"></div>

          <div v-html="renderLocale('results.professionals.health_advise')"></div>

          <div v-html="renderLocale('results.professionals.research_advise')"></div>

        </b-alert>

        <b-alert show variant="danger" v-if="stakeholder == 'client' && predprob > cutoff">
          <div v-html="renderLocale('results.clients.low')"></div>
        </b-alert>

        <b-alert show variant="success" v-if="stakeholder == 'client' && predprob <= cutoff">
          <div v-html="renderLocale('results.clients.adequate')"></div>
        </b-alert>

        <b-alert show variant="info" v-if="stakeholder == 'client'">
          <div v-html="renderLocale('results.clients.target', {protein_target: proteinTarget})"></div>
        </b-alert>

        <p>
          <b-button
            size="lg"
            @click="startOver">
            {{ $t('nav.start_over') }}
          </b-button>
        </p>
        <b-alert show v-if="debug">
          <h5>Values</h5>
          <b-table striped hover :items="valueArray"></b-table>
          <h5>BMI</h5>
          <b-table striped hover :items="bmiArray"></b-table>
          <h5>Answers</h5>
          <b-table striped hover :items="recodedAnswersArray"></b-table>
        </b-alert>
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
      intercept: 'config/intercept',
      shrinkageFactor: 'config/shrinkageFactor',
      weightAdjustedFactor: 'config/weightAdjustedFactor',
      storeResultsEndpoint: 'config/storeResultsEndpoint',
      unique_id: 'quiz/unique_id',
      reg_id: 'quiz/reg_id',
      answers: 'quiz/answers',
      cutoffPercentage: 'config/cutoffPercentage',
      stakeholder: 'config/stakeholder',
      weight: 'quiz/weight',
      weightAdjusted: 'quiz/weightAdjusted',
      length: 'quiz/length',
      age: 'quiz/age',
      recodedAnswers: 'quiz/recodedAnswers',
      proteinTarget: 'quiz/proteinTarget'
    }),
    valueArray () {
      return [
        {name: 'Intercept', value: this.intercept},
        {name: 'WeightAdj factor', value: this.weightAdjustedFactor},
        {name: 'Shrinkage factor', value: this.shrinkageFactor}
      ]
    },
    bmiArray () {
      return [
        {name: 'Age', value: this.age},
        {name: 'Length', value: this.length},
        {name: 'Weight', value: this.weight},
        {name: 'Weight adjusted', value: this.weightAdjusted},
        {name: 'BMI', value: this.weightAdjusted / ((this.length / 100) * (this.length / 100))}
      ]
    },
    recodedAnswersArray () {
      return Object.entries(this.recodedAnswers).map(obj => {
        return obj[1]
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
