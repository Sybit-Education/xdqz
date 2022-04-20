<template>
  <b-row class="highscore-item">
    <b-col class="highscore-item__name">
      {{ item.Shortname }}
    </b-col>
    <b-col class="highscore-item__score">
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
    }
  },
  computed: {
    score: function () {
      return new Intl.NumberFormat('de-DE').format(this.item.Score)
    }
  }
}
</script>

<style lang="scss" scoped>
.highscore-item {
  &__name {
    font-weight: bold;
  }
  &__score {
    font-weight: bold;
    color: #ff0000;
  }
}
</style>
