<template lang="html">
  <b-row class="question">
    <b-col cols="12">
      <p>{{ $t(question.title) }}</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['question']
}
</script>
