<template>
  <b-button class="answer-button d-flex" @click="clicked()">
    <span class="answer-button__id">{{ answer.id }}:</span>
    <span class="answer-button__text">{{ answer.answer }}</span>
  </b-button>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  methods: {
    clicked () {
      this.$emit('clicked', this.answer.id)
    }
  }
}
</script>

<style lang="scss" scoped>

.answer-button{
  height: 15vh;
  width: 40vw;
  margin-bottom: 50px;
  background: #b51783;
  &__id{
    font-size: 36px;
    font-weight: bold;
  }
  &__text{
    padding-right: 0.75rem;
    font-size: 36px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    hyphens: auto;
    line-height: 2.5rem;
  }

}

</style>
