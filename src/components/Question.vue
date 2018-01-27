<template>
  <b-row>
    <b-col cols="12" md="6">
      <h3>{{ $t(question.title) }}</h3>
    </b-col>
    <b-col cols="12" md="6">
      <b-form-group>
        <b-form-radio-group id="btnradios4" class="btn-block"
                            buttons
                            button-variant="outline-secondary"
                            block
                            stacked
                            v-model="answer"
                            :options="translatedAnswers"
                            name="radioBtnStacked" />
      </b-form-group>
      {{ translatedAnswers }}
    </b-col>
  </b-row>    
</template>

<script>
  export default {
    data () {
      return {
        answer: null
      }
    },
    props: ['question'],
    computed: {
      translatedAnswers () {
        return this.question.answers.map((obj) => {
          return {
            text: this.$t(obj.text, {count: obj.value}, obj.value),
            value: "val" + obj.value 
          }
        })
      }
    }
  }
</script>
