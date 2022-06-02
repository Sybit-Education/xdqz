<template>
  <b-container class="login">
    <header-item/>
    <b-card class="login__pin-card my-5">
      <b-overlay :show="busy" rounded="lg" opacity="0.6">
        <template #overlay>
          <div class="d-flex align-items-center">
            <b-spinner small type="grow" variant="secondary"></b-spinner>
            <b-spinner type="grow" variant="dark"></b-spinner>
            <b-spinner small type="grow" variant="secondary"></b-spinner>
          </div>
        </template>
        <b-card-text v-if="errorMessage" class="login__error text-center">
          <b-alert variant="danger" show><h4>{{ errorMessage }}</h4></b-alert>
          <b-button @click="reload" size="lg">Erneut versuchen</b-button>
        </b-card-text>
        <b-form v-else-if="!isShortnameSet" @submit.prevent="checkShortname">
          <b-card-text>
            <h3 class="text-center">Gib dein Kürzel ein:</h3>

            <b-input
              ref="shortname"
              class="shortname-input"
              size="lg"
              v-model="shortname"
              placeholder="z.B. tre"
            />
            <b-row class="button-row mt-2" v-if="!errorMessage && shortname">
              <b-button size="lg" variant="primary" type="submit">
                Weiter
              </b-button>
            </b-row>
          </b-card-text>
        </b-form>
        <b-form v-else-if="isShortnameSet" @submit.prevent="start">
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
      </b-overlay>
    </b-card>

    <b-card class="rules my-2">
      <ol>
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
import HeaderItem from '@/components/HeaderItem.vue'
import loginService from '@/services/login.service'
import RandomSprite from '@/components/RandomSprite.vue'

export default {
  name: 'LoginView',
  components: {
    HeaderItem,
    RandomSprite
  },
  data () {
    return {
      shortname: null,
      nickname: null,
      errorMessage: '',
      busy: false,
      isShortnameSet: false
    }
  },
  methods: {
    checkShortname () {
      if (this.shortname && this.shortname.length > 0 && this.shortname.length < 5) {
        this.isShortnameSet = true
      } else {
        this.errorMessage = 'Falsches Kürzel!'
      }
    },
    async start () {
      this.busy = true
      if (this.shortname && this.isShortnameSet) {
        const loggedIn = await loginService.login(this.shortname, this.nickname)
        if (loggedIn) {
          await this.$router.push({ name: 'Question' })
        } else {
          this.errorMessage = 'Etwas is schief gelaufen, versuche es nochmal!'
        }
      } else {
        this.isShortnameSet = false
      }
      this.busy = false
    },
    reload () {
      this.shortname = ''
      this.errorMessage = ''
    }
  }
}
</script>

<style lang="scss">
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
  padding-bottom: 0.25rem;

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
