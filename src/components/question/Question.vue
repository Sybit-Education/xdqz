<template>
  <div class="mt-3">

    <b-row class="time-and-score">
      <b-col cols="5" align="left">
        <h5>Score: <span class="score">{{ score }}</span></h5>
      </b-col>
      <b-col cols="2" align="center">
        <random-sprite />
      </b-col>
      <b-col cols="5" align="right">
        <h5>Zeit: <span class="countdown">{{ countdown }}</span></h5>
      </b-col>
    </b-row>

    <div class="question-text">{{ question.question }}</div>

    <b-row class="mt-3">
      <b-col cols="6" v-for="answer in question.answers" :key="answer.id">
        <answer :answer="answer" @clicked="checkSolution($event)" />
      </b-col>
    </b-row>

  </div>
</template>

<script>
import Answer from '@/components/question/Answer'
import RandomSprite from '@/components/RandomSprite.vue'

export default {
  name: 'Question',
  components: { Answer, RandomSprite },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  watch: {
    question () {
      this.init()
    }
  },
  data () {
    return {
      countdown: 30,
      interval: undefined,
      start: undefined,
      millis: 0
    }
  },
  computed: {
    score () {
      return this.$store.getters.getScore
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.countdown = 30
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.start = Date.now()
      this.interval = setInterval(() => {
        if (this.countdown <= 0) {
          this.cancelInterval()
          this.$emit('next')
        } else {
          this.countdown--
        }
      }, 1000)
    },
    cancelInterval () {
      clearInterval(this.interval)
      const usedMillis = Date.now() - this.start
      this.millis = 30000 - usedMillis
    },
    checkSolution (solution) {
      this.cancelInterval()
      let score = 0
      if (solution === this.question.solution) {
        switch (this.question.level) {
          case 'easy':
            score = this.millis * 10
            break
          case 'medium':
            score = this.millis * 20
            break
          case 'difficult':
            score = this.millis * 30
            break
        }
        this.$store.dispatch('addScore', score)
      }
      this.$emit('next')
    }
  }
}
</script>

<style scoped>
.score, .countdown {
  color: #b51783;
}

.question-text{
  min-height: 180px;
  height: 180px;
  margin-bottom: 0.75rem;
  font-size: 32px;
  font-weight: 600;
}

.time-and-score{
  font-family: 'press_start_2pregular' !important;
}
</style>
