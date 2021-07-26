// control del link de youtube
const searchParams = new URLSearchParams( window.location.search); //obtener el url
const link = searchParams.get('link'); //obtener el parametro escritorio
let linkss= link.split('=');
console.log(linkss);




// socket io
const socket = io();
socket.on('connect',()=>{
    console.log("conectado");
    
});
socket.on('disconnect',()=>{
    console.log("Desconectado del server");
    
});

socket.on('plays',(info) =>{
    player.seekTo(info.time);
    player.playVideo();
});
socket.on('pausas',(info) =>{
    player.seekTo(info.time);
    player.pauseVideo();
});
socket.on('seekTos',(info) =>{
    player.seekTo(info.time);
    
});






// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//videoBar status
var vbar = document.getElementById("videoBar");
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '490',
    width: '640',
    videoId: linkss[1],
    playerVars: {
        'playsinline': 0,
        'controls': 0,
        'rel': 0,
        'disablekb': 0,
        'fs':0,
        'rel':0

    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
    console.log(player.getDuration());
    vbar.max = player.getDuration();


}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    // done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}


vbar.addEventListener("input",(event)=>{
    // console.log(event);
    player.seekTo(vbar.value,true);
    socket.emit('seekTo', {'time': vbar.value});
})

function play(){
    player.playVideo();
    socket.emit('play', {'time':Math.round(player.getCurrentTime())});
}
function pausa(){
    player.pauseVideo();
    socket.emit('pause',{'time':Math.round(player.getCurrentTime())});
    // player.getCurrentTime()
}






//progress video 
setInterval(function(){
    console.log(Math.round(player.getCurrentTime()));
    vbar.value = Math.round(player.getCurrentTime());
}, 200);