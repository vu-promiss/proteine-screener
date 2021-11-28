<template lang="html">
      <b-alert show variant="info" v-html="renderLocale('results.clients.target', {protein_target: proteinTargetForAgeAndWeight, target: proteinTargetForAge})"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      proteinTargetForAgeAndWeight: 'quiz/proteinTargetForAgeAndWeight',
      proteinTargetForAge: 'quiz/proteinTargetForAge'
    })
  }
}
</script>
