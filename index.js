const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080;

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})