<template>
  <b-container fluid class="highscore">
    <b-row>
      <b-col><b-img src="/img/banner.png" center class="highscore__banner"/></b-col>
    </b-row>
    <hr>
    <b-row>
      <b-col cols="6">
        <highscore-item
          v-for="(item, index) in highscore"
          :key="item.id"
          :item="item" :rank="index+1"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { crono } from 'vue-crono'
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
  mixins: [crono],
  mounted () {
    this.getData()
  },
  cron: {
    time: REFRESH_SECONDS * 1000, // seconds * milliseconds
    method: 'getData'
  },
  methods: {
    getData () {
      highscoreService.getHighscore().then((result) => {
        this.highscore = result
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
.highscore__banner {

  height: auto;
  max-height: 200px;
}
</style>
