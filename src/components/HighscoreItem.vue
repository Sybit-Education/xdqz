<template>
  <b-row v-if="show" class="highscore-item" :class="'highscore-item__rank-'+rank">
    <b-col class="highscore-item__rank-col text-right" cols="2">
      {{ rank }}.
    </b-col>
    <b-col class="highscore-item__name-col text-left" cols="5">
      {{ name }}
    </b-col>
    <b-col class="highscore-item__score-col text-right" cols="5">
      {{ score }}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
      default: null
    },
    rank: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.delayedShow()
  },
  computed: {
    score: function () {
      if (this.item) {
        return new Intl.NumberFormat('de-DE').format(this.item.Score)
      }
      return ''
    },
    name: function () {
      if (this.item) {
        return this.item.Nickname ? this.item.Nickname : this.item.Shortname
      }
      return ''
    }
  },
  methods: {
    delayedShow () {
      const delay = 500 * this.rank
      setTimeout(() => {
        this.show = true
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
.highscore-item {
  margin: 0;
  padding: 8px;
  font-size: 40px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 3px rgba(255, 255, 255,  0.5);

  &__rank-1 {
    color: rgb(255, 97, 205);
    text-shadow: 0 0 3px rgb(247, 127, 209);
  }
  &__rank-2 {
    color: rgb(205, 102, 172);
    text-shadow: 0 0 3px rgb(203, 81, 164);
  }
  &__rank-3 {
    color: rgb(180, 136, 166);
    text-shadow: 0 0 3px rgb(190, 83, 156);
  }
  &__rank-4 {
    color: rgb(171, 130, 157);
    text-shadow: 0 0 3px rgb(190, 83, 156);
  }
  &__rank-5 {
    color: rgb(129, 119, 126);
    text-shadow: 0 0 3px rgb(190, 83, 156);
  }
  &__rank-col {

  }
  &__name-col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__score-col {

  }
}
</style>
