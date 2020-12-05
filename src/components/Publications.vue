<template>
  <b-container class="home">
    <b-row class="pt-2">
      <b-col cols="12" md="8">
        <h2>{{ $t('publications.title') }}</h2>
        <ol id="example-1">
            <li v-for="item in publications" :key="item.link">
                <strong>{{ item.year }}</strong> {{ item.title }}
                <br>
                <a :href="item.link" target="_blank">{{ $t('publications.view_article') }}</a>
            </li>
        </ol>
        <router-link
          class="btn
          btn-info
          btn-lg"
          :to="{ name: 'home'}">{{ $t('nav.back') }}
        </router-link>
      </b-col>
      <b-col cols="12" md="4" class="d-none d-md-block">
        <img class="img-fluid" src="../assets/egg_measuring_tape.jpg" />
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

export default {
  name: 'Publications',
  mounted () {
    this.loadPublications()
  },
  computed: {
    ...mapGetters({
      publications: 'config/publications'
    })
  },
  methods: {
    ...mapActions({
      loadPublications: 'config/loadPublications'
    })
  }
}
</script>
