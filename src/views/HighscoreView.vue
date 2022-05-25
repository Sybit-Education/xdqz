<template>
  <b-container fluid class="highscore">
    <b-row>
      <b-col>
        <router-link to="/">
          <b-img src="/img/Highscore.png" center class="highscore__banner"/>
        </router-link>
      </b-col>
    </b-row>
    <hr>
    <b-row>
      <div class="highscore__columns">
        <highscore-item
          v-for="(item, index) in highscore"
          :key="item.id"
          :item="item" :rank="index + 1"
        />
      </div>
    </b-row>
  </b-container>
</template>

<script>
import highscoreService from '@/services/highscore.service'
import HighscoreItem from '@/components/HighscoreItem.vue'

const REFRESH_SECONDS = 20

export default {
  components: { HighscoreItem },
  name: 'HighscoreView',
  data () {
    return {
      highscore: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.highscore = []
      highscoreService.getHighscore()
        .then((resultList) => {
          this.highscore = resultList
          setTimeout(() => {
            this.getData()
          }, REFRESH_SECONDS * 1000)
        })
    }
  }
}
</script>

<style lang="scss">
html, h1, p {
  background-color: rgba(0, 0, 0, 0.9);
  color: aliceblue;
}
#app {
  background-color: rgba(0, 0, 0, 0.9);
}
.highscore {
  &__banner {
    height: auto;
    max-height: 200px;
  }
  &__columns {
   overflow: hidden;
   height: 480px;
   max-height: 480px;
   column-count: 2;
   column-gap:2em;
   column-width: calc(100vw  / 2 - 4em);
   column-fill: auto;
   column-rule-style:dotted;
   column-rule-width:10px;
   column-rule-color:silver;
  }
}
</style>
