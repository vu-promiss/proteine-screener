<template>
  <div class="form-check">
    
    <label class="text-left btn btn-secondary btn-lg btn-block form-check-label" :for="questionId + answer.id">
      <input 
        class="form-check-input" 
        type="radio"
        :id = "questionId + answer.id"
        :name="questionId" 
        :value="answer.id">
        {{ $t(answer.title, {count: answer.amount}, answer.amount) }}
    </label>
    {{ answer }}
  </div>
</template>

<script>
export default {
  props: ['questionId', 'answer']
}
</script>
