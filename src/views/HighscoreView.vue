<template>
  <b-container class="highscore">
    <h1>Highscore</h1>
    <hr>
    <highscore-item v-for="item in highscore" :key="item.id" :item="item"></highscore-item>
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

<style>
h1{
  font-family: 'press_start_2pregular' !important;
}
</style>
