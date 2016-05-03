const ioClient = require('socket.io-client')

function socket (store) {
  const io = ioClient.connect('http://localhost:3000')
  io.on('connect', function (data) {
    console.log(data)
  })
  io.on('message', function (data) {
    console.log(data)
  })
  // io.on('disconnect', socket(store))

  store.subscribe(function () {
    if (store.getState().running) {
      io.emit('action', {action: 'run'})
    } else {
      io.emit('action', {action: 'stop'})
    }
  })
}

module.exports = socket
