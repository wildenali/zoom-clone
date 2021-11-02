const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true
})

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    // res.status(200).send("heloww")
    // res.render('room');
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        // socket.to(roomId).broadcast.emit('user-connected');  // ini versi socket io lama
        socket.broadcast.to(roomId).emit('user-connected', userId);     // ini versi "socket.io": "^4.3.1"
    })
})


server.listen(3030);