<template lang="html">
  <div class="editor">
    <textarea v-model="strQuestions" name="name" rows="8" cols="80"></textarea>
    {{ strQuestions }}
    <b-button
      v-on:click="updateQuestions"
    >Update</b-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'screener',
  data () {
    return {
      textarea: ''
    }
  },
  computed: {
    ...mapGetters({
      questions: 'quiz/questions'
    }),
    strQuestions () {
      console.log(this)
      return this.$store.getters['quiz/strQuestions']
    }
  },
  methods: {
    ...mapMutations({
      setQuestions: 'quiz/setQuestions'
    }),
    updateQuestions: () => {
      let obj = JSON.parse(this.strQuestions)
      console.log(obj)
    }
  }
}
</script>