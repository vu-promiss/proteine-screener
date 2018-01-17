<template>
    <div class="question">
        <h3>{{ $t(question.title) }}</h3>
        
        <div v-for="answer in question.answers">
          <answer :answer="answer"></answer>
        </div>

        {{ question.answers }}

    </div>
    
</template>

<script>
  import Answer from './Answer'
  export default {
    props: ['question'],
    components: {
      Answer
    }
  }
</script>
