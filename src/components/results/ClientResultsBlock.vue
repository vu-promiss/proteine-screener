<template lang="html">
    <div>
        <b-alert show variant="danger" 
            v-if="predprob > cutoff" 
            v-html="renderLocale('results.clients.low', {age: age, length: length, weight: weight })"
        />
        <b-alert show variant="success" 
            v-if="predprob <= cutoff" 
            v-html="renderLocale('results.clients.adequate', {age: age, length: length, weight: weight })"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      predprob: 'quiz/predprob',
      cutoff: 'config/cutoff',
      weight: 'quiz/weight',
      length: 'quiz/length',
      age: 'quiz/age'
    })
  }
}
</script>
