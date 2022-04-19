<template>
  <div>
    {{ question.question }}
    <answer v-for="answer in question.answers" :key="answer.id" :answer="answer" />
  </div>
</template>

<script>
import Answer from '@/components/question/Answer'
export default {
  name: 'Question',
  components: { Answer },
  props: {
    question: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
