const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req,res) => {
  res.send('<h1>CONNECTED</h1>')
})
//FOR IO ON
io.on('connection', (socket)=>{
  console.log('a user connected')

  socket.on('isiTableDeck', (data) => {
    console.log(data,'ini dari client')
    //broadcast pesannya
    //sendALl
    io.emit('tabledeck', data)
  })
})

http.listen(port , () => {
  console.log(`server listened on port ${port}`)
})