<template>
  <b-container class="home">
    <b-row class="pt-2">
      <b-col cols="12" md="8">
        <h2>{{ $t('print.title') }}
          <b-button variant="outline-secondary" onclick="window.print()">
            <font-awesome-icon icon="print"/> {{ $t('print.print') }}
          </b-button>
        </h2>
        <p v-for="item in renderQuizResults" :key="item.id">
            <strong>{{ $t('question_number', {number: item.number}) }}:</strong>
              {{ $t(item.id + '.text') }} <br>
            Uw antwoord: 
              {{ $t(item.answer.text, {count: item.answer.count, fraction: item.answer.fraction}, item.answer.count) }}
        </p>
        <a
          class="btn
          btn-info
          btn-lg"
          @click="$router.go(-1)">{{ $t('nav.back') }}
        </a>
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
import { mapGetters } from 'vuex'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'Print',
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters({
      renderQuizResults: 'quiz/renderQuizResults'
    })
  }
}
</script>
