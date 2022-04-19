<template>
  <b-button class="w-100 mb-3" @click="clicked()">
    {{ answer.id }}: {{ answer.answer }}
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

<style scoped>

</style>
