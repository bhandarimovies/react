import { Server } from 'socket.io'

export function attachSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  })

  io.on('connection', (socket) => {
    socket.on('joinProjectRoom', ({ projectId }) => {
      if (!projectId) return
      socket.join(`project:${projectId}`)
    })
  })

  return io
}

