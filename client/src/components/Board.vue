<template>
  <!-- <div class="container" style='text-align:center;'>
    <canvas ref="game" width="1000" height="400" style="border: 1px solid black; background-image:url(https://i.imgur.com/WuJjKMx.jpg);"></canvas>
      <div class="wrapper">
        <button v-if="resetGame" v-on:click="reset" class="cta" href="#">
          <span>Reset Game</span>
         </button><br>
         <button v-if="resetGame" v-on:click="logout" class="cta" href="#">
          <span>Logout</span>
         </button>
      </div>
    <h2 v-if="win">{{winner}}</h2>
  </div> -->

 <div class="container" style="height:100vh">
     <div class="row h-100 align-items-center m-1">

<div class="col-md-6 mx-auto m-1">

  <div class="row board">
    <div class="col">
      <div class="playerBox">
        <h3>List Player</h3>
        <hr/>
        <div v-if="isGameStart===false">
        </div>
        <Player
          v-for="(player, index) in players"
          :key="index"
          :player="player"
        />
      </div>
      <form @submit.prevent="startGame()">
        <button class="btn btn-info" type="submit">start</button>
      </form>
    </div>
    <div class="col boxes">
      <div class="quizbox">
        <!-- isi soal -->
        <span v-if="isGameStart===true" v-html="question"></span>
      </div>
      <div class="text-center">

        <p v-if="isGameStart===true">{{questionLeft}} question left</p>
        {{counter}}
      </div>
      <div class="textbox" v-if="playerCanAnswer === true && isGameStart===true">
        <form @submit.prevent="sendAnswer()">
          <div class="form-group">
            <input type="number" v-model="answerBox" class="form-control" placeholder="Type your answer">
            <button type="submit" class="btn btn-primary">Send Answer</button>
          </div>

          <p>

          <div style="margin: 5px 20px 20px;">
<div class="smallfont" style="margin-bottom: 2px;"><b>See the answer: </b>: <input value="Buka" style="margin: 0px; padding: 0px; width: 55px; font-size: 12px;" onclick="if (this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display != '') { this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = ''; this.innerText = ''; this.value = 'Tutup'; } else { this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = 'none'; this.innerText = ''; this.value = 'Buka'; }" type="button">
</div>
<div class="alt2" style="border: 1px inset ; margin: 0px; padding: 6px;">
<div style="display: none;">

 <p v-if="isGameStart===true">Jawaban : {{answer}}</p>

 <br>
</div>
</div>
</div>
        </form>
      </div>
    </div>
  </div>
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
      answerBox: '',
      counter: 0,
      questionLeft: 0,
      isGameStart: false,
      answer: 0,
      question: '',
      playerCanAnswer: true
    }
  },
  sockets: {
    statusGame (status) {
      this.isGameStart = status
    },
    counter (counter) {
      this.counter = counter
    },
    questionLeft (question) {
      this.questionLeft = question
    },
    dataQuestion (dataFromServer) {
      this.question = dataFromServer.question
      this.answer = dataFromServer.answer
    },
    enableAnswerForm () {
      this.playerCanAnswer = true
    },
    updateDataPlayer (dataPlayer) {
      this.$store.commit('login', dataPlayer)
    },
    kickAllPlayer () {
      this.$store.commit('kickAllPlayer')
    },
    getWinner (winner) {
      alert(`the winner is ${winner}`)
    }
  },
  methods: {
    sendAnswer () {
      const dataAnswer = {
        id: localStorage.id,
        name: localStorage.name,
        answer: this.answerBox
      }
      this.$socket.emit('sendAnswer', dataAnswer)
      this.playerCanAnswer = false
      this.answerBox = ''
    },
    startGame () {
      this.$socket.emit('startGame')
    }
  },
  computed: {
    ...mapState(['players'])
  }
}

</script>

<style scoped>
  /* canvas {
    font-family: "Font Awesome 5 Free";
    content: "\f005";
    font-weight: 900;
  }

  .wrapper {
    display: flex;
    justify-content: center;
  }

  .cta {
    display: flex;
    padding: 10px 45px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    color: white;
    background: #6225E6;
    transition: 1s;
    box-shadow: 6px 6px 0 black;
    transform: skewX(-15deg);
  }

  .cta:focus {
    outline: none;
  }

  .cta:hover {
    transition: 0.5s;
    box-shadow: 10px 10px 0 #FBC638;
  }

  .cta span:nth-child(2) {
      transition: 0.5s;
      margin-right: 0px;
  }

  .cta:hover  span:nth-child(2) {
    transition: 0.5s;
    margin-right: 45px;
  }

  span {
    transform: skewX(15deg);
  }

  span:nth-child(2) {
    width: 20px;
    margin-left: 30px;
    position: relative;
    top: 12%;
  } */

  .btn {
    width: 100%;
  }
  .board {
    margin: auto;
  }
  .quizbox{
    padding: 5px;
    margin: auto;
    height: 300px;
  }
  .playerBox {
    min-height: 300px;
    overflow-y: scroll;
  }
  .boxes{
    margin: auto;
    width: 300px;
    background-color: bisque;
    min-height: 200px;
  }
  .textbox{
    padding: 5px;
  }
  body {
  background-image: "https://t4.ftcdn.net/jpg/02/71/12/01/360_F_271120192_ZDT2FCxH94akiIsOHwVULWnbNzi8Oagn.jpg"
}

</style>
