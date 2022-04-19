<template>
  <b-container class="highscore">
    <h1>Highscore</h1>
    <highscore-item v-for="item in highscore" :key="item.id" :item="item"></highscore-item>
  </b-container>
</template>

<script>
import highscoreService from '@/services/highscore.service'
import HighscoreItem from '@/components/HighscoreItem.vue'

export default {
  components: { HighscoreItem },
  name: 'HighscoreView',
  data () {
    return {
      highscore: []
    }
  },
  mounted () {
    highscoreService.getHighscore().then((result) => {
      this.highscore = result
    })
  }

}
</script>

<style>

</style>
