# kartuKipak-Client

LOGIC GUIDE 

let players = [
  {id: 1, name: "Udin"},
  {id: 2, name: "Budi"},
]

io.emit('on:register', players)

if players.length > 2{
  // gak usah accept connection

  io.emit('room_full', players )
}
// case di si A dan B
io.on("room_full", (players) => {
  let userId = localStorage.getItem('userId')
  if("ada userId di players ?"){
    return
  }else{
    alert("room full")
  }
})

let playerA = [
  
  { card: "8", userId: 1, statement: "7", action: null},
  { card: "9", userId: 1, statement: "7", action: null},
]

let playerB = [
  
  { card: "2", userId: 2, statement: "7", action: null},
  { card: "3", userId: 2, statement: "7", action: null},
  
]

let deck = [  
  { card: "7", userId: 1, statement: "7", action: null },
  { card: "1", userId: 2, statement: "5", action: "guess" },
]