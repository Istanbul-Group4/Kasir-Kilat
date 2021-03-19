import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    numberPlayer: 0,
    messages: ['test'],
    counter: 0
  },
  mutations: {
    sendChat (context, payload) {
      context.messages.unshift(payload)
    },
    login (context, payload) {
      context.players = payload
      context.numberPlayer = context.players.length
    },
    kickAllPlayer (context, payload) {
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      router.push('/')
    }
  },
  actions: {
  },
  modules: {
  }
})
