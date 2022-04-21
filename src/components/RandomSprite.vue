<template>
  <b-img v-if="image" class="random-sprite" :src="image" />
</template>

<script>
export default {
  name: 'RandomSprite',
  data () {
    return {
      image: null,
      imageList: [
        '/img/sprites/Controller.png',
        '/img/sprites/SyGhost.png',
        '/img/sprites/SyPacman.png'
      ]
    }
  },
  mounted () {
    this.randomImage()
  },
  methods: {
    randomImage () {
      const randomIndex = Math.floor(Math.random() * this.imageList.length)
      this.image = this.imageList[randomIndex]
    }
  }

}
</script>

<style lang="scss" scoped>
.random-sprite {
  width: 140px;
  max-height: 140px;
  z-index: -10;
  animation: shake 0.5s;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
