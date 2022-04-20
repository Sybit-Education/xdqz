<template>
  <b-container>
    <b-col align="center">
      <h1 class="mb-5">Dein Ergebnis</h1>
      <h3>Herzlichen Glückwunsch du hast</h3>
      <h2>1000P</h2>
      <h3>erreicht!</h3>
      <h2 class="mt-5">
        Neustart in <br>
        <span class="countdown">{{ countdown }}</span>
        <br>
        <b-button @click="restart" size="lg">Jetzt neustarten</b-button>
      </h2>
    </b-col>
  </b-container>
</template>

<script>
export default {
  name: 'End',
  data () {
    return {
      countdown: 15
    }
  },
  created () {
    const interval = setInterval(() => {
      if (this.countdown <= 0) {
        clearInterval(interval)
        this.restart()
      } else {
        this.countdown--
      }
    }, 1000)
  },
  methods: {
    restart () {
      // TODO: reset user and score
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped lang="scss">
h1, h2 {
  color: #b51783;
  font-weight: bold;
}

.countdown {
  color: black;
  font-weight: bold;
  font-size: 100px;
}
</style>
