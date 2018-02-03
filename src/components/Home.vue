<template>
  <div class="hello">
    <img src="../assets/logo_promiss.png">

    <h1>{{ $t('content') }}</h1>
    <router-link class="btn btn-primary btn-lg" :to="{ name: 'screener'}">{{ $t('home.button.title') }}</router-link>
    <hr>
    
    <button 
      v-on:click.stop="$i18n.set('en')"
      :disabled="$i18n.locale() == 'en'"
      class="btn btn-primary btn-lg">EN
    </button>
    <button 
      v-on:click.stop="$i18n.set('nl')"
      :disabled="$i18n.locale() == 'nl'"
      class="btn btn-primary btn-lg">NL
    </button>
    <button 
      v-on:click.stop="$i18n.set('fi')"
      :disabled="$i18n.locale() == 'fi'"
      class="btn btn-primary btn-lg">FI
    </button>
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
      autoNext: 'quiz/autoNext'
    })
  },
  methods: {
    changeAutoNext (val) {
      this.$store.commit('quiz/setAutoNext', val)
    }
  }
}
</script>

