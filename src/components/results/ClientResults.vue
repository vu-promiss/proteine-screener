<template lang="html">
<div>
    <b-alert show variant="danger" v-if="predprob > cutoff">
      <div v-html="renderLocale('results.clients.low', {
        age: age,
        length: length,
        weight: weight
      })"></div>
    </b-alert>

    <b-alert show variant="success" v-if="predprob <= cutoff">
      <div v-html="renderLocale('results.clients.adequate')"></div>
    </b-alert>

    <b-alert show variant="info">
      <div v-html="renderLocale('results.clients.target', {protein_target: proteinTarget})"></div>
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
      proteinTarget: 'quiz/proteinTarget',
      weight: 'quiz/weight',
      length: 'quiz/length',
      age: 'quiz/age'
    })
  }
}
</script>

<style lang="css">
</style>
