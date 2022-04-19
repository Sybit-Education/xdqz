<template>
  <b-container>
    <b-row class="highscore-item">
      <b-col class="highscore-item__name">
        {{ item.Shortname }}
      </b-col>
      <b-col class="highscore-item__score">
        {{ item.Score }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
