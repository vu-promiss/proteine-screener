<template>
  <b-container class="home">
    <b-row class="pt-2">
      <b-col cols="12" md="8">
        <h2>{{ $t('home.title') }}</h2>
        <template v-if="stakeholder == 'professional'">
          <div v-html="renderLocale('home.professionals')"></div>
        </template>

        <template v-if="stakeholder == 'client'">
          <div v-html="renderLocale('home.clients')"></div>
        </template>
        
        <div class="text-center">
          <router-link
            class="btn
            btn-info
            btn-lg"
            :to="{ name: 'screener', params: { stakeholder: stakeholder }}">{{ $t('home.button') }}
            <font-awesome-icon icon="arrow-alt-circle-right"/>
          </router-link>
          <p v-if="stakeholder == 'professional'">
            <em>
              {{ $t('home.proversion') }}
              <b-link href="" @click.stop="updateStakeholder('client')">
                {{ $t('home.proversion_link') }}
              </b-link>
            </em>
          </p>
          <p v-if="stakeholder == 'client'">
            <em>
              {{ $t('home.clientversion') }}
              <b-link href="#" @click.stop="updateStakeholder('professional')">
                {{ $t('home.clientversion_link') }}
              </b-link>
            </em>
          </p>
        </div>
      </b-col>
      <b-col cols="12" md="4" class="d-none d-md-block">
        <img class="img-fluid" src="../assets/egg_measuring_tape.jpg" />
      </b-col>
      <b-col cols="12" class="text-center">
        <b-form-checkbox v-if="allowAutoNext" id="checkbox1"
          :checked="autoNext"
          @change="changeAutoNext"
          value="1"
          unchecked-value="0">
          Auto Next
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row class="pt-2">
      <b-col cols="12" md="8">
        <b-row>
          <b-col cols="6">
              <img class="img-fluid" src="../assets/VUlogo.svg" />
          </b-col>
          <b-col cols="6">
              <img class="img-fluid" src="../assets/promiss_logo.svg" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'Home',
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters({
      autoNext: 'quiz/autoNext',
      locales: 'config/locales',
      stakeholder: 'config/stakeholder',
      cutoffPercentage: 'config/cutoffPercentage',
      allowAutoNext: 'config/showAutonextButton'
    })
  },
  methods: {
    ...mapActions({
      updateStakeholder: 'config/updateStakeholder'
    }),
    changeAutoNext (val) {
      this.$store.commit('quiz/setAutoNext', val)
    }
  }
}
</script>
