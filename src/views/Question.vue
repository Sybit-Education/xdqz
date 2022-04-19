<template>
  <b-container>
    <div v-if="questions.length">
      <question :question="questions[0]" class="mb-5" />
      <question :question="questions[1]" />
    </div>
    <b-spinner v-else></b-spinner>
  </b-container>
</template>

<script>
import Question from '@/components/question/Question'
import questionService from '@/services/question.service'

export default {
  components: { Question },
  data () {
    return {
      questions: []
    }
  },
  async created () {
    this.questions = await questionService.getQuestions()
  }
}
</script>

<style scoped>

</style>
