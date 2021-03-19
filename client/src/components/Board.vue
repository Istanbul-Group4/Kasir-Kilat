<template>
  <div class="row board">
    <div class="col">
      <div class="playerBox">
        <h3>List Player</h3>
        <hr/>
        <Player
          v-for="(player, index) in players"
          :key="index"
          :player="player"
        />
      </div>
      <div v-if="isGameStart===false">
        <form @submit.prevent="startGame()">
          <button class="btn btn-primary" type="submit">start</button>
        </form>
      </div>
      <div>
          <button class="btn btn-warning" type="button" @click.prevent="logout()">leave game</button>
      </div>
    </div>
    <div class="col boxes">
      <div class="quizbox">
        <!-- isi soal -->
        <span v-if="isGameStart===true" v-html="question"></span> <hr/>
      </div>
      <div class="text-center">
        <!-- <p v-if="isGameStart===true">jawaban : {{answer}}</p> -->
        <p class="question-counter" v-if="isGameStart===true">{{questionLeft}} question left</p>
        <p class="question-counter" v-if="isGameStart===true">{{counter}}</p>
      </div>
      <div class="textbox" v-if="playerCanAnswer === true && isGameStart===true">
        <form @submit.prevent="sendAnswer()">
          <div class="form-group">
            <input type="number" v-model="answerBox" class="form-control" placeholder="Type your answer">
            <button type="submit" class="btn btn-primary">Send Answer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/components/Player.vue'
import { mapState } from 'vuex'

export default {
  name: 'Board',
  components: {
    Player
  },
  data () {
    return {
      answerBox: ''
    }
  },
  sockets: {
    // statusGame (status) {
    //   this.$store.commit('statusGame', status)
    // },
    // counter (counter) {
    //   this.$store.commit('counter', counter)
    // },
    // questionLeft (question) {
    //   this.$store.commit('questionLeft', question)
    // },
    // dataQuestion (dataFromServer) {
    //   this.$store.commit('dataQuestion', dataFromServer)
    // },
    // enableAnswerForm () {
    //   this.$store.commit('enableAnswerForm', true)
    // },
    // updateDataPlayer (dataPlayer) {
    //   this.$store.commit('login', dataPlayer)
    // },
    // kickAllPlayer () {
    //   this.$store.commit('kickAllPlayer')
    // },
    // getWinner (winner) {
    //   this.$store.commit('winnerPage', winner)
    // }
  },
  methods: {
    sendAnswer () {
      const dataAnswer = {
        id: localStorage.id,
        name: localStorage.name,
        answer: this.answerBox
      }
      this.$socket.emit('sendAnswer', dataAnswer)
      this.$store.commit('disableAnswerForm')
      this.answerBox = ''
    },
    startGame () {
      this.$socket.emit('startGame')
    },
    refreshPlayer (dataPlayer) {
      this.$socket.emit('refreshDataPlayer', dataPlayer)
    },
    logout () {
      this.$socket.emit('logout', localStorage.id)
      this.$store.commit('logout')
    }
  },
  created () {
    if (localStorage.id) {
      this.refreshPlayer()
    } else {
      this.$route.push('/')
    }
  },
  computed: {
    ...mapState(
      [
        'players',
        'isGameStart',
        'numberPlayer',
        'counter',
        'questionLeft',
        'answer',
        'question',
        'playerCanAnswer'
      ])
  }
}

</script>

<style scoped>
  body {
    background-image: url('https://toppng.com/uploads/preview/transparent-tumblr-math-mathematical-formula-11563015562eyx6q3ujlf.png');
  }
  .btn {
    width: 100%;
  }
  .board {
    background-image: url('https://cdn.pixabay.com/photo/2017/04/05/04/44/background-2203989_960_720.jpg');
    border-radius: 10px;
    margin: auto;
    margin-top: 10%;
    padding: 20px;
    box-shadow: 0 0 10px 2px #0098a3;
  }
  .question-counter {
    margin: 5px;
  }
  .quizbox{
    padding: 5px;
    margin: auto;
    max-height: 300px;
  }
  .playerBox {
    min-height: 300px;
    overflow-y: scroll;
  }
  .boxes{
    background-image: url('https://thumbs.dreamstime.com/b/vector-abstract-geometric-background-design-element-form-blue-hexagon-vector-abstract-geometric-background-design-element-form-131911559.jpg');
    border-radius: 10px;
    margin: auto;
    width: 300px;
    background-color: bisque;
    min-height: 200px;
  }
  .textbox{
    padding: 5px;
  }
</style>
