<template lang="html">
  <b-row align-h="center">
    <b-col cols="12" md="8" class="text-left">
      <b-alert show variant="danger" v-if="predprob > cutoff">
        <div v-html="renderLocale('results.clients.low', {
          age: age,
          length: length,
          weight: weight
        })"></div>
      </b-alert>
        <b-alert 
          show variant="success" v-if="predprob <= cutoff" v-html="renderLocale('results.clients.adequate')">
        </b-alert>
        <p v-if="callingPage == 'results'">
          <b-button size="lg" @click="startOver">
              {{ $t('nav.start_over') }}
          </b-button>
        </p>
    </b-col>
    <b-col cols="12" md="4" class="text-left">
      <b-alert show variant="info">
        <div v-html="renderLocale('results.clients.target', {protein_target: proteinTarget})"></div>
      </b-alert>
      <b-alert show variant="info" v-if="callingPage == 'results'">
        <div v-html="renderLocale('results.clients.print')"></div>
      </b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: [
    'startOver',
    'callingPage'
  ],
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
