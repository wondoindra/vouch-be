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
  console.log('hello')
  res.send('<h1>Hello world</h1>')
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: true }
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})