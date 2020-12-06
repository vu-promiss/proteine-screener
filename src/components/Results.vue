<template lang="html">
  <div class="results">
    <professional-results :startOver="startOver" v-if="stakeholder == 'professional'"></professional-results>
    <client-results :startOver="startOver" calling-page="results" v-if="stakeholder == 'client'"></client-results>
    <debug-results v-if="debug"></debug-results>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import ClientResults from './results/ClientResults'
import ProfessionalResults from './results/ProfessionalResults'
import DebugResults from './results/DebugResults'

export default {
  components: {
    ClientResults,
    ProfessionalResults,
    DebugResults
  },
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
      debug: 'config/debug',
      unique_id: 'quiz/unique_id',
      reg_id: 'quiz/reg_id',
      stakeholder: 'config/stakeholder'
    })
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
