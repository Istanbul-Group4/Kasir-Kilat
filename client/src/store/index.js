import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quiz: {
      text: 'Berapa hasil dari 45 + 5 = ...',
      value: '50'
    },
    currentPoint: 0
  },
  mutations: {
    pointPlus (state, n) {
      state.currentPoint += n
    }
  },
  actions: {

  }
})
