import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    numberPlayer: 0,
    isGameStart: false,
    counter: 0,
    questionLeft: 0,
    answer: 0,
    question: '',
    playerCanAnswer: true,
    winner: ''
  },
  mutations: {
    login (context, payload) {
      context.players = payload
      context.numberPlayer = context.players.length
    },
    logout (context, payload) {
      localStorage.clear()
      router.push('/')
    },
    kickAllPlayer (context, payload) {
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      router.push('/')
    },
    statusGame (context, payload) {
      context.isGameStart = payload
    },
    counter (context, payload) {
      context.counter = payload
    },
    questionLeft (context, payload) {
      context.questionLeft = payload
    },
    dataQuestion (context, payload) {
      context.question = payload.question
      context.answer = payload.answer
    },
    enableAnswerForm (context) {
      context.playerCanAnswer = true
    },
    disableAnswerForm (context) {
      context.playerCanAnswer = false
    },
    winnerPage (context, payload) {
      context.winner = payload
      Swal.fire({
        title: `The Winner is ${payload}`,
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }
  },
  actions: {
    SOCKET_updateDataPlayer (context, player) {
      console.log('INI DATA PLAYER MASUK', player)
      context.commit('login', player)
    },
    SOCKET_kickAllPlayer (context) {
      console.log('MASUK KICK')
      context.commit('kickAllPlayer')
    },
    SOCKET_statusGame (context, status) {
      console.log('MASUK STATUS')
      context.commit('statusGame', status)
    },
    SOCKET_counter (context, counter) {
      console.log('MASUK COUNTER')
      context.commit('counter', counter)
    },
    SOCKET_questionLeft (context, question) {
      console.log('MASUK QUESTION LEFT')
      context.commit('questionLeft', question)
    },
    SOCKET_dataQuestion (context, dataFromServer) {
      console.log('DATA FROM SERVER MASUK')
      context.commit('dataQuestion', dataFromServer)
    },
    SOCKET_enableAnswerForm (context) {
      console.log('MASUK ENABLE ANSWER')
      context.commit('enableAnswerForm')
    },
    SOCKET_getWinner (context, winner) {
      console.log('MASUK WINNER')
      context.commit('winnerPage', winner)
    }
  },
  modules: {
  }
})
