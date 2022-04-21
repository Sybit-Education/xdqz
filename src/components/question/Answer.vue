<template>
  <div class="mt-3">
    <b-button-group size="lg">
      <b-button id="answerButtons" variant="secondary" @click="clicked()">
        <h3 class="d-flex justify-content-start mt-1">
          {{ answer.id }}:
          {{ answer.answer }}
        </h3>
      </b-button>
    </b-button-group>
  </div>
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

#answerButtons{
  padding: 50px;
  height: 250px;
  width: 400px;
  margin-bottom: 50px;
}

</style>
