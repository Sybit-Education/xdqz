<template>
  <b-container>
    <h2>Frage {{ questionLabel }}</h2>
    <b-progress :value="questionLabel" :max="10" variant="primary" />
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
      questionIndex: 0,
      easy: 0,
      medium: 0,
      difficult: 0
    }
  },
  computed: {
    questionLabel () {
      return this.questionIndex + 1
    }
  },
  created () {
    questionService.getQuestions().then(list => {
      this.initList(list, true)
      if (this.questions.length !== 10) {
        this.initList(list, false)
      }
      this.questions.sort(this.compare)
    })
  },
  methods: {
    nextQuestion () {
      this.questionIndex++
      if (this.questionIndex === 9) {
        // TODO: push to end page
        this.$router.push({ name: 'Home' })
      }
    },
    initList (list, checkUser) {
      this.shuffle(list)
      list.forEach(question => {
        switch (question.level) {
          case 'easy':
            question.levelId = 1
            if (this.easy < 4) {
              if (checkUser) {
                // TODO: get user from store
                if (this.user !== question.source) {
                  this.questions.push(question)
                  this.easy++
                }
              } else {
                this.questions.push(question)
                this.easy++
              }
            }
            break
          case 'medium':
            if (this.medium < 3) {
              question.levelId = 2
              if (checkUser) {
                if (this.user !== question.source) {
                  this.questions.push(question)
                  this.medium++
                }
              } else {
                this.questions.push(question)
                this.medium++
              }
            }
            break
          case 'difficult':
            question.levelId = 3
            if (this.difficult < 3) {
              if (checkUser) {
                if (this.user !== question.source) {
                  this.questions.push(question)
                  this.difficult++
                }
              } else {
                this.questions.push(question)
                this.difficult++
              }
            }
            break
        }
      })
    },
    compare (a, b) {
      if (a.levelId < b.levelId) {
        return -1
      }
      if (a.levelId > b.levelId) {
        return 1
      }
      return 0
    },
    shuffle (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }

  }
}
</script>

<style scoped>

</style>
