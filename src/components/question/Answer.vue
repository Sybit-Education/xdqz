<template>
  <b-button class="w-100 mb-3" variant="secondary" @click="clicked()">
    <h3 class="d-flex justify-content-start mt-1">
      {{ answer.id }}:
      {{ answer.answer }}
    </h3>
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
