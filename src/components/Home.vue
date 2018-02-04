<template>
  <div class="home">
    <b-row class="pt-2">
      <b-col cols="6">
        <img class="img-fluid" src="../assets/logo_promiss.png" />
      </b-col>
      <b-col cols="6">
        <b-button-group>
          <b-button v-for="locale in locales"
            v-on:click.stop="$i18n.set(locale)"
            :pressed="$i18n.locale() === locale"
            variant="outline-secondary"
            > {{ locale | uppercase }}
          </b-button>
        </b-button-group>
      </b-col>
      <b-col cols="12">
        <h1>{{ $t('content') }}</h1>
      </b-col>
      <b-col cols="12" class="text-center">
        <router-link class="btn btn-secondary btn-lg" :to="{ name: 'screener'}">{{ $t('home.button.title') }}</router-link>
      </b-col>
      <b-col cols="12" class="text-center">
        <b-form-checkbox id="checkbox1"
          :checked="autoNext"
          @change="changeAutoNext"
          value="1"
          unchecked-value="0">
          Auto Next
        </b-form-checkbox>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      autoNext: 'quiz/autoNext',
      locales: 'config/locales'
    })
  },
  methods: {
    changeAutoNext (val) {
      this.$store.commit('quiz/setAutoNext', val)
    }
  }
}
</script>

