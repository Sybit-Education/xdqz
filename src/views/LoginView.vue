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
              class="input"
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

          <b-input size="lg" :value="shortname"></b-input>
        </b-card-text>
      </template>
      <b-card-text v-else class="login__error">
        Invalid PIN-Code
      </b-card-text>
    </b-card>
    <hr>
    <b-row>
      <b-button size="lg" variant="primary" class="login__button" :disabled="usedPin" @click="start">
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
      this.result = loginService.verifyPin(pin)
      this.pin = pin
    },
    start () {
      console.log('start')
      if (this.shortname && this.shortname.length > 0 && this.shortname.length < 5) {
        loginService.setShortname(this.pin, this.shortname)
      } else {
        console.error('invalid shortname')
      }
    }
  },
  computed: {
    validPin () {
      return (this.result?.length === 1)
    },
    usedPin () {
      return this.validPin && this.result?.[0].Shortname
    }
  }
}
</script>

<style lang="css">
.react-code-input > input {
  font-family: var(--font-family-monospace) !important;
}
</style>
