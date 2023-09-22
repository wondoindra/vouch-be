const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Server } = require("socket.io")


const PORT = process.env.PORT || 8080;

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: true }
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('login-user', (data) => {
    const { roomId, username } = data
    socket.join(roomId)
    socket.to(roomId).emit('add-user', { username, message: `${username} has joined ${roomId}` })
  })

  socket.on('send-message', (data) => {
    socket.broadcast.emit('new-message', data)
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})