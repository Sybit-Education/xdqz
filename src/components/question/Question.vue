<template>
  <div>
    {{ question.question }}
    <b-row class="mt-2">
      <b-col cols="6" v-for="answer in question.answers" :key="answer.id">
        <answer :answer="answer" @clicked="checkSolution($event)" />
      </b-col>
    </b-row>
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
  },
  methods: {
    checkSolution (solution) {
      // TODO: save in store solution === this.question.solution
      this.$emit('next')
    }
  }
}
</script>

<style scoped>

</style>
