<template lang="html">
    <div>
        <b-alert show>
            <h5>Values</h5>
            <b-table striped hover :items="valueArray"></b-table>
        </b-alert>
        <b-alert show>
            <h5>BMI</h5>
            <b-table striped hover :items="bmiArray"></b-table>
        </b-alert>
        <b-alert show>
            <h5>Answers</h5>
            <b-table striped hover :items="recodedAnswersArray"></b-table>
        </b-alert>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      predprob: 'quiz/predprob',
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
  }
}
</script>

<style lang="css">
</style>
