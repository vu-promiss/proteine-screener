<template lang="html">
    <b-row align-h="center">
        <b-col cols="12" md="8" class="text-left">
            <b-alert show>
                <h3>{{ $t('results.professionals.probability', {percentage: parseInt(predprob * 100)}) }}</h3>
            </b-alert>
            <b-alert show v-html="renderLocale('results.professionals.explanation')"></b-alert>
            <b-alert show v-html="renderLocale('results.professionals.target')"></b-alert>
            <p>
                <b-button size="lg" @click="startOver">
                    {{ $t('nav.start_over') }}
                </b-button>
            </p>
        </b-col> 
        <b-col cols="12" md="4" class="text-left">
            <b-card bg-variant="light">
                <b-card-text v-html="renderLocale('results.professionals.health_advise')"></b-card-text>
            </b-card>
            <b-card bg-variant="light" class="my-3">
                <b-card-text v-html="renderLocale('results.professionals.research_advise')"></b-card-text>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: [
    'startOver'
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
