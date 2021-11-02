const socket = io('/')
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
// myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let myVideoStream

navigator.mediaDevices.getUserMedia({
    video: true,
    audia: false
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        console.log('masuk A')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    
    socket.on('user-connected', (userId) => {
        console.log('masuk')
        setTimeout(connecToNewUser,2000,userId,stream);
        // connecToNewUser(userId, stream);
    })
})

peer.on('open', id => {
    // console.log(id)
    socket.emit('join-room', ROOM_ID, id)
})

const connecToNewUser = (userId, stream) => {
    // console.log('new user');
    // console.log(userId);
    console.log('masuk 2')
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    console.log('masuk 3')
    call.on('stream', userVideoStream => {
        console.log('masuk 4')
        addVideoStream(video, userVideoStream)
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

let text = $('input')
console.log(text)

$('html').keydown((e) => {
    if(e.which == 13 && text.val().length !== 0) {
        console.log(text.val())
        socket.emit('message', text.val());
        text.val('');
    }
})