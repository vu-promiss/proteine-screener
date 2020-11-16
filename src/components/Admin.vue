<template lang="html">
  <div class="admin">
    <b-container>
      <b-row>
        <b-col>
          <h1>Results</h1>
          <p>Here you can download the results of the screener</p>
          <p>Completed: {{ completed }}</p>
          <p>Incomplete: {{ incomplete }}</p>
          <b-button
            href="/api/export"
          >Download csv results</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      completed: '',
      incomplete: ''
    }
  },
  mounted () {
    // send results to api
    let that = this
    axios.get(this.statsEndpoint)
      .then(function (response) {
        that.completed = response.data.completed
        that.incomplete = response.data.incomplete
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  computed: {
    ...mapGetters({
      statsEndpoint: 'config/statsEndpoint'
    })
  }

}
</script>