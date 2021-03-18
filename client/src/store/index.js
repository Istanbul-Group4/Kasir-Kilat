import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('username') || false,
    card_deck: [],
    table_deck: [],
    card : {
      id: 0,
      value: '',
      userId: 0,
      statement: '',
      boolean:'',
    },
    cardSlot: 0,
  },
  mutations: {
    isLogin (state,payload) {
      state.isLoggedIn = payload
    },
    setStatement (state,payload) {
      state.statement = payload
    },
    setValue (state,payload) {
      state.card.value = payload
    },
    setOwner (state,payload) {
      state.card.userId = payload
    },
    setNewCardToDeck (state,payload) {
      state.card_deck.push(payload)
    },
    setCardSlot (state,payload) {
      state.cardSlot = payload
    },
    setBoolean (state,payload){
      if(payload.value === payload.statement) {
        payload.boolean = true
      }else if (payload.value !== payload.statement) {
        payload.boolean = false
      }
    },
    setId (state) {
      let card_deck = state.card_deck
      
      if(card_deck.length > 0){
        state.card.id = card_deck[card_deck.length-1].id + 1
      }else{
        state.card.id = 1
        }
    },
    setCardOnTable (state, payload) {
      state.table_deck.push(payload)
      state.table_deck.pop(payload)
    }
      

  },
  sockets: {
    tabledeck(cards) {

    }

  },
  actions: {
    login(context, payload) {
      localStorage.setItem('username', payload.username)
      context.commit('isLogin' , true)
    },
    logout (context) {
      localStorage.clear()
      context.commit('isLogin', false)
      router.push('/')
    },
    valueGenerator (context) {
      let cardValue = Math.round(Math.random()*10)
      context.commit('setValue',cardValue)
    },
    CardGenerator (context) {
      let slots = state.cardSlot
      for(let i = 0 ; i < slots ; i ++){
        this.valueGenerator()//
        this.setId()
        // jika player 1 yang megang maka userId adalah 1
        let card = state.card
        context.commit('setNewCardToDeck',card)
      }
    },
    newGame (context) {
      //generate player
      //kasih deck card masing2 player
      //player turns
    }

  },

  created () {
    //jika kartu player kosong maka player yang kartunya kosong menang
  },

  modules: {

  }
})
