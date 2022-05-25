<template>
  <b-container class="login">
    <header-item/>
    <b-card class="login__pin-card my-5">
      <b-card-text v-if="!pin" class="text-center">
        <h3>Pin-Code eingeben:</h3>
        <b-row>
          <b-col>
            <b-overlay :show="busy" rounded="lg" opacity="0.6">
              <template #overlay>
                <div class="d-flex align-items-center">
                  <b-spinner small type="grow" variant="secondary"></b-spinner>
                  <b-spinner type="grow" variant="dark"></b-spinner>
                  <b-spinner small type="grow" variant="secondary"></b-spinner>
                </div>
              </template>
              <code-input
                ref="pinRef"
                class="pin-input"
                :fields="6"
                auto-focus
                @complete="onPinComplete"
              />
            </b-overlay>
          </b-col>
        </b-row>
      </b-card-text>
      <b-card-text v-if="errorMessage" class="login__error text-center">
        <b-alert variant="danger" show><h4>{{ errorMessage }}</h4></b-alert>
        <b-button @click="reload" size="lg">Erneut versuchen</b-button>
      </b-card-text>
      <b-form v-else-if="pin && !isShortnameSet" @submit.prevent="checkShortname">
        <b-card-text>
          <h3 class="text-center">Gib dein Kürzel ein:</h3>

          <b-input
            ref="shortname"
            class="shortname-input"
            size="lg"
            v-model="shortname"
            placeholder="z.B. tre"
          />

          <b-alert class="m-3" variant="warning" show>
            <h5>
              Achtung: Jedes Kürzel <strong>hat jeden Tag nur einen Versuch</strong>
              und nimmt am Gewinnspiel teil.<br>
              Stelle sicher, dass es wirklich <strong>dein Kürzel</strong> ist!
            </h5>
          </b-alert>
          <b-row class="button-row" v-if="!errorMessage && shortname">
            <b-button size="lg" variant="primary" type="submit">
              Weiter
            </b-button>
          </b-row>
        </b-card-text>
      </b-form>
      <b-form v-else-if="pin && isShortnameSet" @submit.prevent="start">
        <b-card-text class="my-5">
          <h3 class="text-center">Nickname für die Highscore:</h3>

          <b-input
            ref="nickname"
            class="nickname-input"
            size="lg"
            v-model="nickname"
            placeholder="e.g. Ninja Turtle"
            style="max-width: 360px;"
          />

          <b-alert class="m-3" variant="warning" show>
            <h5>
              Mit diesem Nickname werden deine Ergebnisse auf der Highscore angezeigt.
            </h5>
          </b-alert>
          <b-row class="button-row" v-if="!errorMessage && shortname">
            <b-button size="lg" variant="primary" type="submit">
              -&gt; Start! &lt;-
            </b-button>
          </b-row>
        </b-card-text>
      </b-form>
    </b-card>

    <b-card class="rules my-5">
      <ol>
        <li>
          1 Versuch pro Tag!
        </li>
        <li>
          30 sec. pro Frage; je schneller umso mehr Punkte!
        </li>
        <li>
          Es gibt kein Zurück ;)
        </li>
      </ol>
    </b-card>
    <div class="sprite">
      <random-sprite/>
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
      nickname: null,
      result: null,
      errorMessage: '',
      busy: false,
      isShortnameSet: false
    }
  },
  methods: {
    async onPinComplete (pin) {
      this.errorMessage = ''
      this.busy = true
      const result = await loginService.verifyPin(pin)
      if (result.length === 1) {
        if (result?.[0].Shortname) {
          this.errorMessage = `Pin wird schon verwendet: ${result[0].Shortname}`
        } else {
          this.pin = pin
          this.result = result
          setTimeout(() => {
            this.$refs.shortname.focus()
          }, 500)
        }
      } else if (result?.length === 0 && pin.length === 6) {
        this.errorMessage = 'Ungültiger Pin!'
      }
      this.busy = false
    },
    checkShortname () {
      if (this.shortname && this.shortname.length > 0 && this.shortname.length < 5) {
        loginService.isUserUsed(this.shortname).then(isUsed => {
          if (isUsed) {
            this.errorMessage = `${this.shortname} hat schon 2 mal mitgespielt!`
          } else {
            this.isShortnameSet = true
          }
        })
      } else {
        this.errorMessage = 'Falsches Kürzel!'
      }
    },
    start () {
      if (this.shortname && this.isShortnameSet) {
        loginService.setShortname(this.result?.[0], this.pin, this.shortname, this.nickname)
        this.$router.push({ name: 'Question' })
      } else {
        this.isShortnameSet = false
      }
    },
    reload () {
      this.result = null
      this.pin = null
      this.shortname = ''
      this.$refs.pinRef.values = ['', '', '', '', '', '']
      this.errorMessage = ''
      this.$refs.pinRef.$el.focus()
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
  font-family: 'press_start_2pregular' !important;
}

.shortname-input {
  margin-top: 1rem;
  width: 340px;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
}

.nickname-input {
  margin-top: 1rem;
  width: 340px;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
}

p {
  font-family: 'press_start_2pregular' !important;
  font-size: 24px;
}

.login__pin-card {
  min-height: 30vh;
}

.button-row {
  display: flex;
  justify-content: center;
}

.rules {
  background-color: rgba(190, 83, 156, 0.5) !important;

  li {
    margin-left: 2.75rem;
    font-family: 'press_start_2pregular' !important;
    font-size: 24px;
    font-weight: 500;
  }
}

.sprite {
  display: flex;
  justify-content: center;
}
</style>
