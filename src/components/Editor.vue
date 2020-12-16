<template>
  <b-container class="editor">
    <b-row class="pt-2">
      <b-col cols="12" md="12">
        <h2>Locale Viewer</h2>
        <table class="table table-striped">
          <tbody>
            <tr v-for="str in localeStrings">
              <th>{{ str[0] }}</th>
              <td v-if="typeof str[1] === 'string'"
                v-html="renderLocale(str[0], {
                  age: 30, length: 170, weight: 60, protein_target: 10,
                  session_id: 'sess123', count: 4, fraction: '1/2', number: 8, norm: 0.8
              })"/>
              <td v-if="typeof str[1] !== 'string'" v-html="renderLocale(str[1])"/>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import router from '../router'
import axios from 'axios'
import yaml from 'js-yaml'
import dotize from 'dotize'

export default {
  name: 'Print',
  data: function () {
    return {
      localeStrings: []
    }
  },
  mounted () {
    axios.get('locales/nl.yaml').then((response) => {
      let localeData = yaml.safeLoad(response.data)
      let obj = this.flattenedLocale(localeData)
      this.localeStrings = Object.keys(obj).map((key) => [key, obj[key]])
    })
  },
  computed: {
    getLocaleData () {
    }
  },
  methods: {
    flattenedLocale (localeData) {
      return dotize.convert(localeData)
    }
  }
}
</script>
