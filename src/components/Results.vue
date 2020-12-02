<template lang="html">
  <div class="results">
    <b-row align-h="center">
      <b-col cols="12" md="6" class="text-left">
        <b-alert show v-if="stakeholder == 'professional'">
          <h3>{{ $t('results.professionals.chance', {percentage: predprob * 100 | integer})  }}</h3>

          <h5>{{ $t('results.professionals.explanation.title') }}</h5>
          <ul>
            <li>{{ $t('results.professionals.explanation.item_1', {percentage: predprob * 100 | integer}) }}</li>
            <li>{{ $t('results.professionals.explanation.item_2') }}</li>
            <li>{{ $t('results.professionals.explanation.item_3') }}</li>
          </ul>

          <h5>{{ $t('results.professionals.target.title') }}</h5>
          <ul>
            <li>{{ $t('results.professionals.target.item_1') }}</li>
            <li>{{ $t('results.professionals.target.item_2') }}</li>
            <li>{{ $t('results.professionals.target.item_3') }}</li>
          </ul>

          <h5>{{ $t('results.professionals.health_advise.title') }}</h5>
          <p>{{ $t('results.professionals.health_advise.paragraph') }}</p>

          <h5>{{ $t('results.professionals.research_advise.title') }}</h5>
          <p>{{ $t('results.professionals.research_advise.paragraph') }}</p>

        </b-alert>

        <b-alert show variant="danger" v-if="stakeholder == 'client' && predprob > cutoff">
            <p>{{ $t('results.clients.low.paragraph_1') }}</p>
            <p>{{ $t('results.clients.low.paragraph_2') }}</p>
            <p>{{ $t('results.clients.low.paragraph_3') }}</p>
        </b-alert>

        <b-alert show variant="success" v-if="stakeholder == 'client' && predprob <= cutoff">
            <p>{{ $t('results.clients.adequate.paragraph_1') }}</p>
            <p>{{ $t('results.clients.adequate.paragraph_2') }}</p>
            <p>{{ $t('results.clients.adequate.paragraph_3') }}</p>
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
      recodedAnswers: 'quiz/recodedAnswers'
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
