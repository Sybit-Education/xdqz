<template>
  <b-container class="login">
    <b-card class="login__pin-card">
      <b-card-text>
        Enter your PIN-Code
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
      <template v-if="validPin">
        <b-card-text v-if="usedPin">
          Sorry, pin already used by: {{ usedPin }}
        </b-card-text>
        <b-card-text v-else>
          Enter your shortname

          <b-input class="shortname-input" size="lg" v-model="shortname"></b-input>
        </b-card-text>
      </template>
      <b-card-text v-if="errorPin" class="login__error">
        <b-alert variant="danger" show >Invalid PIN-Code</b-alert>
        <b-button @click="reload">Retry</b-button>
      </b-card-text>
    </b-card>
    <hr>
    <b-row>
      <b-button size="lg" variant="primary" class="login__button" :disabled="errorPin" @click="start">
        Start!
      </b-button>
    </b-row>
  </b-container>
</template>

<script>

import CodeInput from 'vue-verification-code-input'
import loginService from '@/services/login.service'

export default {
  name: 'LoginView',
  components: {
    CodeInput
  },
  data () {
    return {
      pin: null,
      shortname: '',
      result: null
    }
  },
  methods: {
    onPinComplete (pin) {
      loginService.verifyPin(pin).then((result) => {
        this.result = result
        this.pin = pin
      })
    },
    start () {
      if (this.shortname && this.shortname.length > 0 && this.shortname.length < 5) {
        loginService.setShortname(this.result?.[0], this.pin, this.shortname)
      } else {
        console.error('invalid shortname')
      }
    },
    reload () {
      this.result = null
      this.pin = null
      this.shortname = ''
      this.$refs.pinRef.values = ['', '', '', '', '', '']
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

<style lang="css">
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
</style>
