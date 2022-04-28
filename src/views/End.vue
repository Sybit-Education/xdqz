<template>
  <b-container class="end-view">
    <header-item />
    <b-card align="center my-3">
      <h1 class="mb-3">Dein Ergebnis</h1>
      <b-card-text>
        Herzlichen Glückwunsch {{ name }}, du hast
        <div class="my-3 score">{{ score }} P</div>
        erreicht!
      </b-card-text>
    </b-card>
    <b-row>
      <b-col align="center">
        <random-sprite align="center"/>
      </b-col>
    </b-row>
    <b-card align="center">
      <h2 class="mt-3">Neustart in</h2>
      <div class="my-3 countdown">{{ countdown }}</div>
      <b-button id="restart"
        @click="restart"
        variant="primary"
        size="lg"
      >
        Jetzt neu starten
      </b-button>
    </b-card>
  </b-container>
</template>

<script>
import highscoreService from '@/services/highscore.service'
import HeaderItem from '@/components/HeaderItem.vue'
import RandomSprite from '@/components/RandomSprite.vue'

export default {
  components: { HeaderItem, RandomSprite },
  name: 'End',
  data () {
    return {
      countdown: 15
    }
  },
  computed: {
    score () {
      return new Intl.NumberFormat('de-DE').format(this.$store.getters.getScore)
    },
    name () {
      return this.$store.getters.getUser
    }
  },
  created () {
    highscoreService.setHighscore(this.$store.getters.getUser, this.$store.getters.getScore)
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
      this.$store.state.score = 0
      this.$store.state.user = ''
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped lang="scss">
.end-view{
  font-family: press_start_2pregular;

  h1 {
    color: #b51783;
    font-weight: bold;
  }
  .score {
    color: #b51783;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .countdown {
    font-weight: bold;
    font-size: 2.5rem;
  }
}
</style>
