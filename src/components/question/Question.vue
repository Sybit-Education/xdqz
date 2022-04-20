<template>
  <div>
    <h1>{{ question.question }}</h1>
    <b-row class="mt-2">
      <b-col cols="6" v-for="answer in question.answers" :key="answer.id">
        <answer :answer="answer" @clicked="checkSolution($event)" />
      </b-col>
    </b-row>
    <b-row>
      <b-col align="left">
        <h4>Score: <strong class="score">{{ score }}</strong></h4>
      </b-col>
      <b-col align="right">
        <h4>Zeit: <strong class="countdown">{{ countdown }}</strong></h4>
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
  watch: {
    question () {
      console.log(this.question.solution)
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
</style>
