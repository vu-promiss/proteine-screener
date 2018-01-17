<template>
  <div class="hello">
    <h1>{{ $t('content') }}</h1>
    <router-link class="btn btn-primary btn-lg" :to="{ name: 'screener'}">{{ $t('home.button.title') }}</router-link>
    <h4>Question {{ currentQuestionNumber }} of {{ questions.length }}</h4>
    <question></question>
    <hr>
    <button 
        v-on:click.stop="$i18n.set('nl')"
        :disabled="$i18n.locale() == 'nl'"
        class="btn btn-primary btn-lg">NL</button>
    <button 
        v-on:click.stop="$i18n.set('en')"
        :disabled="$i18n.locale() == 'en'"
        class="btn btn-primary btn-lg">EN</button>
  </div>
</template>

<script>
import Question from './Question'

export default {
  name: 'Home',
  components: {
    'question': Question
  },
  data () {
    return {
      questions: [],
      currentQuestion: null,
      answeredQuestions: [],
      currentQuestionNumber: 1,
      showResults: false
    }
  },
  created () {
    // this.currentQuestion = this.questions[0]
  }
}
</script>

