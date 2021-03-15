<template lang="html">
  <div class="results" v-hotkey="keymap">
    <professional-results 
      :start-over="startOver"
      :prev-question="prevQuestion"
      v-if="stakeholder == 'professional'"
    />
    <client-results
      :start-over="startOver"
      :prev-question="prevQuestion"
      calling-page="results" 
      v-if="stakeholder == 'client'"
    />
    <debug-results v-if="debug"></debug-results>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    this.storeResults()
  },
  computed: {
    ...mapGetters({
      debug: 'config/debug',
      unique_id: 'quiz/unique_id',
      reg_id: 'quiz/reg_id',
      stakeholder: 'config/stakeholder'
    }),
    keymap () {
      return {
        'left': this.prevQuestion,
        'r': this.startOver
      }
    }
  },
  methods: {
    ...mapActions({
      prevQuestion: 'quiz/prevQuestion',
      storeResults: 'quiz/storeResults'
    }),
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
