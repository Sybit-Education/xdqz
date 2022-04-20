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
        <h4>Score: <strong class="score">1000</strong></h4>
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
      this.init()
    }
  },
  data () {
    return {
      countdown: 30,
      interval: undefined
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
      this.interval = setInterval(() => {
        if (this.countdown <= 0) {
          clearInterval(this.interval)
          this.$emit('next')
        } else {
          this.countdown--
        }
      }, 1000)
    },
    checkSolution (solution) {
      // TODO: save in store solution === this.question.solution
      clearInterval(this.interval)
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
