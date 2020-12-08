<template lang="html">
  <b-row align-h="center">
    <b-col cols="12" md="8" class="text-left">
      <client-results-block/>
      <result-navigation :prevQuestion="prevQuestion" :startOver="startOver"/>
    </b-col>
    <b-col cols="12" md="4" class="text-left">
      <stakeholder-switcher/>
      <protein-target-client />
      <go-to-print-page/>
    </b-col>
  </b-row>
</template>

<script>
import StakeholderSwitcher from '../navigation/StakeholderSwitcher'
import ProteinTargetClient from './ProteinTargetClient'
import ClientResultsBlock from './ClientResultsBlock'
import ResultNavigation from './ResultNavigation'
import GoToPrintPage from '../navigation/GoToPrintPage'

export default {
  props: [
    'startOver',
    'prevQuestion',
    'GoToPrintPage',
    'ResultNavigation'
  ],
  components: {
    StakeholderSwitcher,
    ProteinTargetClient,
    GoToPrintPage,
    ClientResultsBlock,
    ResultNavigation
  }
}
</script>
