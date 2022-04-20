import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    score: 0
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    UPDATE_SCORE (state, score) {
      state.score += score
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('SET_USER', user)
    },
    addScore ({ commit }, score) {
      commit('UPDATE_SCORE', score)
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getScore (state) {
      return state.score
    }
  }
})
