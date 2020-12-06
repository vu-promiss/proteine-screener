<template lang="html">
    <b-alert show>
        <p v-if="stakeholder == 'professional'">
            {{ $t('home.proversion') }} <br>
            <b-link href="" @click.stop="updateStakeholder('client')">
              {{ $t('home.proversion_link') }}
            </b-link>
        </p>
        <p v-if="stakeholder == 'client'">
            {{ $t('home.clientversion') }} <br>
            <b-link href="#" @click.stop="updateStakeholder('professional')">
              {{ $t('home.clientversion_link') }}
            </b-link>
        </p>
    </b-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      stakeholder: 'config/stakeholder'
    })
  },
  methods: {
    ...mapActions({
      updateStakeholder: 'config/updateStakeholder'
    })
  }
}
</script>
