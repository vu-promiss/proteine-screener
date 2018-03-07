<template>
  <b-row>
    <b-col cols="12" md="6">
      <p>{{ $t(question.id + '.text') }}</p>
    </b-col>
    <b-col cols="12" md="6">
      <b-form-group
          :label="$t('age.label')"
          label-for="ageInput"
          :invalid-feedback="$t('age.invalid')"
          :state="validAge">
        <b-input-group size="lg" :append="$t('age.append')">
          <b-form-input 
              pattern="[0-9]*"
              id="ageInput"
              :placeholder="$t('age.placeholder')"
              :state="validAge"
              v-model="ageValue">
          </b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group
          :label="$t('weight.label')"
          label-for="weightInput"
          :invalid-feedback="$t('weight.invalid')"
          :state="validWeight">
        <b-input-group size="lg" :append="$t('weight.append')">
          <b-form-input 
            pattern="[0-9]*"
            id="weightInput"
            :placeholder="$t('weight.placeholder')"
            :state="validWeight"
            v-model="weightValue">
          </b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group
          :label="$t('length.label')"
          label-for="lengthInput"
          :invalid-feedback="$t('length.invalid')"
          :state="validLength">
        <b-input-group size="lg" :append="$t('length.append')">
          <b-form-input 
            pattern="[0-9]*"
            id="lengthInput"
            :placeholder="$t('length.placeholder')"
            :state="validLength"
            v-model="lengthValue">
          </b-form-input>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col cols="12" class="text-center d-md-none">
      <b-button
        @click.stop="nextQuestion"
        :disabled="! validBmi"
      >{{ $t('nav.continue') }}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['question'],
  computed: {
    ...mapGetters({
      age: 'quiz/age',
      weight: 'quiz/weight',
      length: 'quiz/length',
      validAge: 'quiz/validAge',
      validWeight: 'quiz/validWeight',
      validLength: 'quiz/validLength',
      validBmi: 'quiz/validBmi'
    }),
    ageValue: {
      get () {
        return this.age
      },
      set (value) {
        this.$store.commit('quiz/setAge', value)
      }
    },
    weightValue: {
      get () {
        return this.weight
      },
      set (value) {
        this.$store.commit('quiz/setWeight', value)
      }
    },
    lengthValue: {
      get () {
        return this.length
      },
      set (value) {
        this.$store.commit('quiz/setLength', value)
      }
    }
  },
  methods: {
    ...mapActions({
      nextQuestion: 'quiz/nextQuestion'
    })
  }
}
</script>

<style lang="css">
</style>
