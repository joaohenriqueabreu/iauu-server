const GetMessageHistoryService = require('../services/message/getMessageHistory')
const SaveMessageService = require('../services/message/saveMessage')

// Socket config
const app = require('express')()

// const sjwt = require('socketio-jwt')
const http = require('http').Server(app)
const io = require('socket.io')(http)
// const chat = require('./sockets/chat')

// To listen to messages
io.of('/chat').on('connection', (socket) => {
  console.log('User connected...')
  let target = {}, room = {}

  socket.on('join', (presentation) => {
    room = presentation

    socket.join(presentation, () => { 
      const getMessageHistorySvc = new GetMessageHistoryService(null, { id: presentation })
      getMessageHistorySvc.get()
        .then(() => socket.emit('welcome', getMessageHistorySvc.getMessages()))
        .catch((error) => socket.emit('error', 'Failed getting presentation messages'))
      })
  })

  socket.on('send', (message) => {
    console.log('New message received...')

    // TODO validate users on message
    const saveMessageService = new SaveMessageService(null, { id: room, message: message })
    saveMessageService.save()
      .then(() => { io.of('/chat').to(room).emit('received', saveMessageService.getLatestMessage()) })
      .catch((error) => socket.emit('error', 'Failed to save message'))
  })
  
  socket.on('disconnect', () => {
    console.log('Disconnected...')
  })
})

module.exports = http