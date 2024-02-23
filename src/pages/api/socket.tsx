
import { playerMessage } from '@/src/interfaces/playerMessages'
import { Server } from 'socket.io'

const SocketHandler = (req:any, res:any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('joinRoom', (msg:string) => {
        console.log('joining room ' + msg)
        socket.join(msg)

      })
      socket.on('playerState-change', (msg:playerMessage) => {
        io.to(msg.roomId).emit('update-playerState', msg)
      })
      socket.on('playerProgress-change', (msg:playerMessage) => {
        io.to(msg.roomId).emit('update-playerProgress', msg)
      })
      socket.on('video-change', (msg:playerMessage) => {
        io.to(msg.roomId).emit('update-video', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler