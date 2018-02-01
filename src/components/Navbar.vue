<template lang="html">
  <b-navbar fixed="top" toggleable="md" type="dark" variant="info">

    <b-navbar-brand :to="{ name: 'home' }" href="#">Protein Screener</b-navbar-brand>
    
    <b-navbar-nav class="ml-auto">
      <b-nav-text>
        PP: {{ predprob | decimal }}
      </b-nav-text>
    </b-navbar-nav>

  </b-navbar>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      predprob: 'quiz/predprob'
    })
  }
}
</script>

<style lang="css">
</style>
