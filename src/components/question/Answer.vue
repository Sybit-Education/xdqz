<template>
  <b-button>
    {{ answer.answer }}
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
  }
}
</script>

<style scoped>

</style>
