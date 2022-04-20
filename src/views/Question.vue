<template>
  <b-container>
    <b-col v-if="countdown > 0" align="center">
      <h2 class="mt-5">
        Spiel startet in <br>
        <span class="countdown">{{ countdown }}</span>
      </h2>
      <h4><strong>Viel Erfolg!</strong></h4>
    </b-col>
    <b-col v-else align="center">
      <h1>Frage {{ questionLabel }}</h1>
      <b-progress :value="questionLabel" :max="10" variant="primary" />
      <span class="d-flex justify-content-end" style="color: grey">{{ questionLabel }}/10</span>
      <div v-if="questions.length">
        <question :question="questions[questionIndex]" class="mb-5" @next="nextQuestion" />
      </div>
    </b-col>
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
      countdown: 5,
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
    const interval = setInterval(() => {
      if (this.countdown <= 0) {
        clearInterval(interval)
      } else {
        this.countdown--
      }
    }, 1000)
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
        this.$router.push({ name: 'End' })
      }
    },
    initList (list, checkUser) {
      const user = this.$store.getters.getUser
      this.shuffle(list)
      list.forEach(question => {
        switch (question.level) {
          case 'easy':
            question.levelId = 1
            if (this.easy < 4) {
              if (checkUser) {
                if (user !== question.source) {
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
                if (user !== question.source) {
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
                if (user !== question.source) {
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
h2 {
  color: #b51783;
  font-weight: bold;
}

.countdown {
  color: black;
  font-weight: bold;
  font-size: 100px;
}
</style>
