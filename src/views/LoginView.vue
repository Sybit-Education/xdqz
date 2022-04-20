<template>
  <b-container class="login">
    <header-item help-button/>

    <b-card class="login__pin-card">
      <b-card-text>
        <h3 class="text-center">Enter your PIN-Code</h3>
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
        <b-button @click="reload">Retry</b-button>
      </b-card-text>
      <b-card-text v-else-if="pin">
        <h3 class="text-center">Enter your shortname</h3>
        <b-alert variant="warning" show>
          <h3>Warning: Every shortname has <strong>only one try</strong> and is assigned
          to the prices later. Verify if it is really your shortname!
          </h3>
        </b-alert>
        <b-input class="shortname-input" size="lg" v-model="shortname" placeholder="e.g. tre"></b-input>
      </b-card-text>
    </b-card>
    <hr>
    <b-row>
      <b-button size="lg" variant="primary" class="login__button" :disabled="!result || !shortname" @click="start">
        Start!
      </b-button>
    </b-row>
  </b-container>
</template>

<script>

import CodeInput from 'vue-verification-code-input'
import HeaderItem from '@/components/HeaderItem.vue'
import loginService from '@/services/login.service'

export default {
  name: 'LoginView',
  components: {
    CodeInput, HeaderItem
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
