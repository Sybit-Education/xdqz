<template>
  <div>
    <b-row id="timeAndScore">
      <b-col align="left">
        <h5>Score: <strong class="score">{{ score }}</strong></h5>
      </b-col>
      <b-col align="right">
        <h5>Zeit: <strong class="countdown">{{ countdown }}</strong></h5>
      </b-col>
    </b-row>
    <h1 id="questionText">{{ question.question }}</h1>
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

#questionText{
  margin-bottom: 175px;
}

#timeAndScore{
  margin-bottom: 150px;
  font-family: 'press_start_2pregular' !important;
}
</style>
