<template lang="html">
  <b-row class="question">
    <b-col cols="12">
      <b-alert show>{{ $t(question.id + '.text') }}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['question']
}
</script>
