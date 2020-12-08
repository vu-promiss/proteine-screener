<template lang="html">
    <b-alert show class="d-print-none">
        <p v-if="stakeholder == 'professional'">
            {{ $t('home.proversion') }} <br>
            <b-link href="" @click.stop="switchStakeholder('client')">
              {{ $t('home.proversion_link') }}
            </b-link>
        </p>
        <p v-if="stakeholder == 'client'">
            {{ $t('home.clientversion') }} <br>
            <b-link href="#" @click.stop="switchStakeholder('professional')">
              {{ $t('home.clientversion_link') }}
            </b-link>
        </p>
    </b-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '../../router'

export default {
  computed: {
    ...mapGetters({
      stakeholder: 'config/stakeholder'
    })
  },
  methods: {
    ...mapActions({
      updateStakeholder: 'config/updateStakeholder'
    }),
    switchStakeholder (stakeholder) {
        router.replace({ name: 'screener', params: { stakeholder: stakeholder } })
        this.updateStakeholder(stakeholder)
    }
  }
}
</script>
