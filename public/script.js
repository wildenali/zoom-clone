const socket = io('/')
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
// myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
});

let myVideoStream

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
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

    let text = $('input')
    // console.log(text)
    
    $('html').keydown((e) => {
        if(e.which == 13 && text.val().length !== 0) {
            console.log(text.val())
            socket.emit('message', text.val());
            text.val('');
        }
    })
    
    socket.on('createMessage', message => {
        // console.log('this is comming from server: ', message)
        $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`)
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

const scrollToBottom = () => {
    let d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

// Mute
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled){
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true
    }
}

const setMuteButton = () => {
    const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const playStop = () => {
    console.log('object paly stop');
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setStopVideo = () => {
    const html = `
        <i class="fas fa-video"></i>
        <span>Stop Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
        <i class="stop fas fa-video-slash"></i>
        <span>Play  Video</span>
    `
    document.querySelector('.main__video_button').innerHTML = html;
}