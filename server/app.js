const express = require('express')
const app = express()
const http = require('http').createServer(app);
const port = process.env.PORT || 3000
const io = require('socket.io')(http);
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//SETTING DISINI (MANUAL DULU YAA) T_T
let userTotalQuestion = 10; //Total pertanyaan
let interval = 25; //Penghitung Waktu
//data player
let player = []
let numberPlayer = 0;
let winner = '';

//data game
let timer = interval+1;
let isGameStart = false;

//data pertanyaan
let totalQuestion = userTotalQuestion;
let dataQuestion = {
  question: '',
  answer: 0
};

//penghitung mundur
let CountDown = setInterval(function(){
  if (isGameStart === true) {
    timer--
    io.sockets.emit('counter', timer);
    io.sockets.emit('dataQuestion', dataQuestion);
    io.sockets.emit('questionLeft', totalQuestion);
    io.emit('updateDataPlayer', player);
    io.emit('statusGame', isGameStart)
  }
  //jika waktu = 0, maka pertanyaan berganti
  if (timer <= 0) {
    generateQuiz();
    totalQuestion--
    timer = interval+1;
    io.sockets.emit('dataQuestion', dataQuestion);
    io.sockets.emit('enableAnswerForm');
  }
  //Kalau game selesai, maka set-ulang variabel
  if (totalQuestion <= 0) {
    setWinner();
    resetGame();
  }
}, 1000);

//random nama
let QuizName = [
  'Pak Budi',
  'Bu Bejo',
  'Pak Salim',
  'Bu Nisa',
  'Pak Sultan',
  'Bu Chandra',
]

//merandom quiz
function generateQuiz () {
  let number1 = Math.ceil(Math.random() * 20)*1500;
  let number2 = Math.ceil(Math.random() * 40)*1500;
  let randomName = Math.floor(Math.random() * (QuizName.length-1));

  if (number2 < number1) {
    number2 = number2+number1
  }

  dataQuestion.question = 
  `
    ${QuizName[randomName]} membeli barang dengan total harga ${number1},<br>
    ${QuizName[randomName]} membayar dengan uang ${number2},<br>
    berapa kembaliannya?
  ` 
  dataQuestion.answer = number2 - number1;
}

//set pemenang
function setWinner () {
  let highestScore = -Infinity;
  let winner = ''
  let top3 = []
  player.forEach(element => {
    if (element.score > highestScore) {
      highestScore = element.score
      winner = element.name
    }
  })
  console.log(`pemenangnya = ${winner}`);
  io.emit('getWinner', winner)
}

//set ulang permainan
function resetGame () {
  isGameStart = false;
  player = []
  numberPlayer = 0;
  winner = '';
  timer = interval;
  isGameStart = false;
  totalQuestion = userTotalQuestion;
  //send data to client
  io.sockets.emit('questionLeft', totalQuestion);
  io.sockets.emit('counter', "Game End!");
  io.emit('statusGame', isGameStart);
  io.emit('kickAllPlayer');
}

//socket io listener
io.on('connection', (socket) => {
  console.log('a user connected');

  //kalo ada yg login
  socket.on('clientLogin', (user) => {
    const newPlayer = {
      id: user.id,
      name: user.name,
      score: 0
    }
    player.push(newPlayer);
    console.log(user.name, 'logged in');
    console.log('player:', numberPlayer);
    io.emit('setToken', newPlayer);
    io.emit('updateDataPlayer', player);
  })

  //ketika tombol start di klik
  socket.on('startGame', (data) => {
    //generate pertanyaan pertama
    generateQuiz();

    isGameStart = true;
    io.emit('statusGame', isGameStart);
  })

  //ketika ada yang menjawab (cek jawaban & update skor)
  socket.on('sendAnswer', (user) =>{
    console.log(`${user.id} ${user.name} menjawab ${user.answer}`);
    //ketika jawaban benar
    if (user.answer == dataQuestion.answer) {
      //looping untuk cari ID nya & tambahkan skor
      player.forEach(element => {
        if (element.id === user.id) {
          element.score = element.score + 10;
          console.log('skor jadi: ', element.score);
        }
      })
    } else {
      //looping untuk cari ID nya & kurangi skor
      player.forEach(element => {
        if (element.id === user.id) {
          element.score = element.score - 5;
          console.log('skor jadi: ', element.score);
        }
      })
    }
    //update data skor ke papan
    io.emit('updateDataPlayer', player);
  })

});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})