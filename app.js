const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const useSocket = require('socket.io')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const fetchDataRouter = require('./routes/tickerRouter')

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api/fetchData', fetchDataRouter)

const server = require('http').Server(app)
const io = useSocket(server)
io.on('connection', (socket) => {
    console.log('Socket connected', socket.id)
})

module.exports = { app, server }