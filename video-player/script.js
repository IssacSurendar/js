const player = document.querySelector('.player')
const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeBar = document.querySelector('.volume-bar')
const volumeRange = document.querySelector('.volume-range')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')
const speedBtn = document.getElementById('player-speed')

// play and pause ===============================
function showPlayIcon(){      
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
}

function togglePlay(){
    if(video.paused){
        video.play()
        playBtn.classList.replace('fa-play','fa-pause')
        playBtn.setAttribute('title', 'Pause')
    }else{
        video.pause()
        showPlayIcon()
    }
}

// calculate display time
function displayTime(time){
    const minute = Math.floor(time/60)
    let seconds = Math.floor(time%60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minute}:${seconds}`
}


// update progress bar
function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`
    duration.textContent = `${displayTime(video.duration)}`
}
// set progress
function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
}


// volume section
let lastVolume = 1
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    // console.log(e)
    if(volume < 0.1){
        volume = 0
    }
    if(volume > 0.9){
        volume = 1
    }
    console.log(volume)
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume
    if(volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up')
        volumeIcon.classList.remove('fa-volume-off', 'fa-volume-down')
    }else if(volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fas', 'fa-volume-down')
        volumeIcon.classList.remove('fa-volume-off', 'fa-volume-up')
    }else if(volume === 0){
        volumeIcon.classList.add('fas', 'fa-volume-off')
        volumeIcon.classList.remove('fa-volume-down', 'fa-volume-up')
    }
    lastVolume = volume
}

function toggleMute(){
    if(video.volume){
        lastVolume = video.volume
        video.volume = 0
        volumeBar.style.width = 0
        volumeIcon.classList.add('fas', 'fa-volume-mute')
        volumeIcon.classList.remove('fa-volume-up')
        volumeIcon.setAttribute('title', 'Mute')
    }else{
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIcon.classList.add('fas', 'fa-volume-up')
        volumeIcon.classList.remove('fa-volume-mute')
        volumeIcon.setAttribute('title', 'Unute')
    }
}

// change speed
function changeSpeed(){
    video.playbackRate = speedBtn.value
}

let fullscreen = false
// toggle fullscreen
function toggleFullScreen(){
    if(!fullscreen){
        openFullscreen(player)
    }else{
        closeFullscreen()
    }
    fullscreen = !fullscreen
}

function openFullscreen(elem){
    if(elem.requestFullscreen){
        elem.requestFullscreen()
    }else if(elem.mozRequestFullScreen){
        elem.mozRequestFullScreen()
    }else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen()
    }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen()
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

// on video end, show play btn
video.addEventListener('ended', showPlayIcon)
// event listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click',setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speedBtn.addEventListener('click', changeSpeed)
fullscreenBtn.addEventListener('click',toggleFullScreen)