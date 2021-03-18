<template>
  <div class="container" style='text-align:center;'>
    <canvas ref="game" width="1000" height="400" style="border: 1px solid black; background-image:url(https://i.imgur.com/WuJjKMx.jpg);"></canvas>
      <div class="wrapper">
       
        <button v-if="resetGame" v-on:click="reset" class="cta" href="#">
          <span>Reset Game</span> 
         </button><br>
         <button v-if="resetGame" v-on:click="logout" class="cta" href="#">
          <span>Logout</span> 
         </button>
      </div>
    <p>
    <h2 v-if="win">{{winner}}</h2>
</p>

  </div>
</template>

<script>


export default {
  name: "Board",
  data() {
    return {

        
      winner: '',
      win: false,
      resetGame: false,
      user1: '',
      user2: ''
    };

  },
  created() {
       
  }, 
  },

  methods: {

      
    },
    reset() {
      this.win = false;
      this.resetGame = false;
      this.socket.emit('reset')
      
    },
    logout(){
      localStorage.clear()
      this.$router.push('/')
    },
    
</script>

<style scoped>  
canvas{
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
    transform: skewX(15deg) 
  }

  span:nth-child(2) {
    width: 20px;
    margin-left: 30px;
    position: relative;
    top: 12%;
  }
  </style>