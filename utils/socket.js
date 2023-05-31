const socketIo = require('socket.io')

export const io = (server, options)=>{
    return socketIo(server, options)
}