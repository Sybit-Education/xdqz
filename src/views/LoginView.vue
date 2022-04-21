<template>
  <b-container class="login">
    <header-item/>
    <b-card class="login__pin-card">
      <b-card-text>
        <h3 class="text-center">Gibt deinen Pin-Code ein</h3>
      </b-card-text>
      <b-card-text>
        <b-row>
          <b-col>
            <code-input
              ref="pinRef"
              class="pin-input"
              :fields="6"
              auto-focus
              @complete="onPinComplete"
            />
          </b-col>
        </b-row>
      </b-card-text>
      <b-card-text v-if="errorMessage" class="login__error">
        <b-alert variant="danger" show>{{ errorMessage }}</b-alert>
        <b-button @click="reload">Erneut versuchen</b-button>
      </b-card-text>
      <b-card-text v-else-if="pin">
        <h3 class="text-center">Gib dein Kürzel ein</h3>
        <b-alert variant="warning" show>
          <h3>Achtung: Jedes Kürzel <strong>hat nur einen Versuch</strong> und nimmt am Gewinnspiel teil. Stelle sicher, dass es dein Kürzel!
          </h3>
        </b-alert>
        <b-input class="shortname-input" size="lg" v-model="shortname" placeholder="e.g. tre"></b-input>
      </b-card-text>
    </b-card>
    <b-row class="button-row">
      <b-button size="lg" variant="primary" class="login__button" @click="start">
        <h3>Start!</h3>
      </b-button>
    <hr>
    <b-row>
      <random-sprite />
      <b-button size="lg" variant="primary" class="login__button" :disabled="!result || !shortname" @click="start">
        Start!
      </b-button>
    </b-row>
    <section id="rules">
      <Strong>
        <h3>
          1.) Pro Spieler nur 1 Versuch!
        </h3>
        <h3>
          2.) 30 sec. pro Frage, je schneller umso mehr Punkte gibt´s!
        </h3>
        <h3>
          3.) Es gibt kein Zurück ;)
        </h3>
      </Strong>
    </section>
    <div class="sprite">
      <random-sprite />
    </div>
  </b-container>
</template>

<script>

import CodeInput from 'vue-verification-code-input'
import HeaderItem from '@/components/HeaderItem.vue'
import loginService from '@/services/login.service'
import RandomSprite from '@/components/RandomSprite.vue'

export default {
  name: 'LoginView',
  components: {
    CodeInput,
    HeaderItem,
    RandomSprite
  },
  data () {
    return {
      pin: null,
      shortname: null,
      result: null,
      errorMessage: ''
    }
  },
  methods: {
    async onPinComplete (pin) {
      this.errorMessage = ''
      const result = await loginService.verifyPin(pin)
      if (result.length === 1) {
        if (result?.[0].Shortname) {
          this.errorMessage = `Pin already used by ${result[0].Shortname}`
        } else {
          this.pin = pin
          this.result = result
        }
      } else if (result?.length === 0 && pin.length === 6) {
        this.errorMessage = 'Pin Invalid'
      }
    },
    start () {
      if (this.shortname && this.shortname.length > 0 && this.shortname.length < 5) {
        loginService.isUserUsed(this.shortname).then(isUsed => {
          if (isUsed) {
            this.errorMessage = `${this.shortname} already played!`
          } else {
            loginService.setShortname(this.result?.[0], this.pin, this.shortname)
            this.$router.push({ name: 'Question' })
          }
        })
      } else {
        console.error('invalid shortname')
      }
    },
    reload () {
      this.result = null
      this.pin = null
      this.shortname = ''
      this.$refs.pinRef.values = ['', '', '', '', '', '']
      this.errorMessage = ''
    }
  },
  computed: {
    validPin () {
      return (this.result?.length === 1)
    },
    errorPin () {
      return (this.result?.length === 0 && this.pin.length === 6)
    },
    usedPin () {
      return this.validPin && this.result?.[0].Shortname
    }
  }
}
</script>

<style lang="scss">
.pin-input {
  margin-left: auto;
  margin-right: auto;
}

.react-code-input > input {
  font-family: 'Common Pixel' !important;
}

.shortname-input {
  margin-top: 1rem;
  width: 340px;
  margin-left: auto;
  margin-right: auto;
}
.b-card-text{
  font-family: 'Common Pixel' !important;
}

.login__pin-card{
  margin: 180px 4px 40px;
}

.text-center{
  margin-bottom: 30px;
}

.button-row{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.login__button{
  border-bottom: 6px inset rgba(0,0,0,.5);
  border-left: 6px inset rgba(0,0,0,.5);
  border-right: 6px inset rgba(255,255,255,.5);
  border-top: 6px inset rgba(255,255,255,.5);
  color: white;
  cursor: pointer;
  &:hover{
    background: #BCBCBC;
  }
}

.col{
  margin-bottom: 15px;
}

#rules{
  margin: 150px 0px 120px;
  display: block;
  text-align: center;
}

.sprite{
  display: flex;
  justify-content: center;
}
</style>
