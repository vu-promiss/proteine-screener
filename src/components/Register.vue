<template>
  <b-container class="home">
    <b-row class="pt-2">
      <b-col cols="12" md="8">
        <h2>{{ $t('home.title') }}</h2>
        <p>{{ $t('session.your_id', {session_id: reg_id}) }}</p>
        <p>{{ $t('home.paragraph1') }}</p>
        <p>{{ $t('home.paragraph2', {cutoff: cutoffPercentage}) }}</p>
        <p>{{ $t('home.paragraph3') }}</p>
        <p class="d-none">{{ $t('home.paragraph4') }}</p>
        <router-link
          class="btn
          btn-info
          btn-lg"
          :to="{ name: 'screener', params: { question: 1 }}">{{ $t('home.button.title') }}
        </router-link>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Register',
  props: ['reg_id'],
  mounted () {
    this.setRegId(this.reg_id)
  },
  computed: {
    ...mapGetters({
      autoNext: 'quiz/autoNext',
      locales: 'config/locales',
      cutoffPercentage: 'config/cutoffPercentage',
      allowAutoNext: 'config/showAutonextButton'
    })
  },
  methods: {
    changeAutoNext (val) {
      this.$store.commit('quiz/setAutoNext', val)
    },
    ...mapMutations({
      setRegId: 'quiz/setRegId'
    })
  }
}
</script>
