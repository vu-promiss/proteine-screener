<template lang="html">
  <b-navbar fixed="top" toggleable="md" type="dark" variant="info">
    <div class="container d-flex justify-content-between">
      <b-navbar-brand :to="{ name: 'home' }" href="#">Protein Screener</b-navbar-brand>
      <b-nav-text v-if="debug">
        PP: {{ predprob | decimal }}
      </b-nav-text>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-dropdown 
            id="ddown1" 
            :text="$i18n.locale() | uppercase" 
            class="m-md-2"
            variant="outline-light"
            right
            size="sm"
          >
            <b-dropdown-item v-for="locale in locales"
              :key="locale"
              v-on:click.prevent="$i18n.set(locale)"
              :active="$i18n.locale() === locale"
              active-class="protein"
              variant="outline-secondary"
              > {{ locale | uppercase }}
            </b-dropdown-item>
          </b-dropdown>
        </b-nav-form>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      predprob: 'quiz/predprob',
      locales: 'config/locales',
      debug: 'config/debug'
    })
  }
}
</script>

<style lang="css">
.dropdown-item.protein {
  background-color: #17a2b8;
  color: #fff
}
</style>
