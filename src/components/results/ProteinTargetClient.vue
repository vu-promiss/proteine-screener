<template lang="html">
      <b-alert show variant="info" v-html="renderLocale('results.clients.target', {protein_target: proteinTarget})"/>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      proteinTarget: 'quiz/proteinTarget'
    })
  }
}
</script>
