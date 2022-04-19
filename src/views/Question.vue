<template>
  <b-container>
    <h2>Frage {{ questionLabel }}</h2>
    <b-progress :value="questionLabel" :max="10" variant="warning" />
    <span class="d-flex justify-content-end" style="color: grey">{{ questionLabel }}/10</span>
    <div v-if="questions.length">
      <question :question="questions[questionIndex]" class="mb-5" @next="nextQuestion" />
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
      questions: [],
      questionIndex: 0
    }
  },
  computed: {
    questionLabel () {
      return this.questionIndex + 1
    }
  },
  async created () {
    this.questions = await questionService.getQuestions()
  },
  methods: {
    nextQuestion () {
      this.questionIndex++
    }
  }
}
</script>

<style scoped>

</style>
