<template>
  <b-container class="home" v-hotkey="keymap">
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
        </div>
      </b-col>
      <b-col cols="12" md="4" class="p-3">
        <stakeholder-switcher></stakeholder-switcher>
        <p class="d-none d-md-block">
          <img class="img-fluid" src="../assets/egg_measuring_tape.jpg" />
        </p>
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
import { mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import StakeholderSwitcher from './navigation/StakeholderSwitcher'
import router from '../router'

export default {
  name: 'Home',
  components: {
    FontAwesomeIcon,
    StakeholderSwitcher
  },
  computed: {
    ...mapGetters({
      autoNext: 'quiz/autoNext',
      locales: 'config/locales',
      stakeholder: 'config/stakeholder',
      allowAutoNext: 'config/showAutonextButton'
    }),
    keymap () {
      return {
        'enter': this.startScreener,
        'right': this.startScreener
      }
    }
  },
  methods: {
    changeAutoNext (val) {
      this.$store.commit('quiz/setAutoNext', val)
    },
    startScreener () {
      router.push({ name: 'screener', params: { stakeholder: this.stakeholder } })
    }
  }
}
</script>
