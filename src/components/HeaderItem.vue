<template>
  <nav>
    <b-img src="/img/Banner.png" alt="Banner" class="banner"  center/>
    <b-row>
      <b-col cols="2">
        <b-button v-if="homeButton" size="lg" to="/"><b-icon icon="house-door-fill" /> Start</b-button>
      </b-col>
      <b-col cols="8">
      </b-col>
    </b-row>
  </nav>
</template>

<script>
export default {
  name: 'HeaderItem',
  props: {
    homeButton: {
      type: Boolean,
      default: false
    },
    helpButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  margin-bottom: 1rem;
  margin-top: 1rem;
}
</style>
