<template>
  <b-row v-if="show" class="highscore-item">
    <b-col class="highscore-item__rank text-right" cols="2">
      {{ rank }}.
    </b-col>
    <b-col class="highscore-item__name text-left" cols="5">
      {{ name }}
    </b-col>
    <b-col class="highscore-item__score text-right" cols="5">
      {{ score }}
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
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
      return new Intl.NumberFormat('de-DE').format(this.item.Score)
    },
    name: function () {
      return this.item?.Nickname ? this.item.Nickname : this.item.Shortname
    }
  },
  methods: {
    delayedShow () {
      const delay = 200 * this.rank
      setTimeout(() => {
        this.show = true
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
.highscore-item {
  &__rank {
    font-size: 36px;
    font-weight: bold;
    color: aliceblue;
  }
  &__name {
    font-size: 36px;
    font-weight: bold;
    color: aliceblue;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__score {
    font-size: 36px;
    font-weight: bold;
    color: aliceblue;
  }
}
</style>
