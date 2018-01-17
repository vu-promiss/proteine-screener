<template>
  <div class="answer">
    <h4>{{ $t(answer.title, {count: answer.amount}, answer.amount) }}</h4>
    {{ answer }}
  </div>
</template>

<script>
export default {
  props: ['answer']
}
</script>

<style lang="css">
</style>
