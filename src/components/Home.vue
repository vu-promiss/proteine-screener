<template>
  <div class="hello">
    <img src="../assets/logo_promiss.png">

    <h1>{{ $t('content') }}</h1>
    <router-link class="btn btn-primary btn-lg" :to="{ name: 'screener'}">{{ $t('home.button.title') }}</router-link>
    <hr>
    
    <b-button v-for="locale in locales"
      v-on:click.stop="$i18n.set(locale)"
      :pressed="$i18n.locale() === locale"
      variant="outline-primary"
      > {{ locale | uppercase }}
    </b-button>
    <hr>
    <b-form-checkbox id="checkbox1"
      :checked="autoNext"
      @change="changeAutoNext"
      value="1"
      unchecked-value="0">
      Auto Next
    </b-form-checkbox>
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

