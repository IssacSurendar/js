const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currenttimet = document.getElementById('current-time')
const durationt = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')


const songs = [
    {
        name: 'jacinto-1', 
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2', 
        displayName: 'Seven Nation Army',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3', 
        displayName:  'Front line',
        artist: 'Jacinto Design'
    }
]

// check if playing
let isPlaying = false

// play
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play()
}
// pause
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause()
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))


// update dom
function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}
let songIndex = 0

// next song func
function nextSong(){
    songIndex++

    if(songIndex > songs.length-1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
// prev song func
function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}


loadSong(songs[songIndex])

// update progess bar
function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement
        // update progess bar
        const progressPercent = (currentTime/duration) * 100
        progress.style.width = `${progressPercent}%`
        // calculate duration
        const durationMinute = Math.floor(duration /60)
        var durationsecond = Math.floor(duration % 60)
        if(durationsecond < 10){
            durationsecond = `0${durationsecond}`
        }
        if(durationsecond){
            durationt.textContent = `${durationMinute} : ${durationsecond}`
        }


        // calculate duration
        const currentMinute = Math.floor(currentTime /60)
        var currentsecond = Math.floor(currentTime % 60)
        if(currentsecond < 10){
            currentsecond = `0${currentsecond}`
        }
        if(currentsecond){
            currenttimet.textContent = `${currentMinute} : ${currentsecond}`
        }

    }
}

// set progress bar
function setProgressBar(e){
    console.log(e)
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    music.currentTime = (clickX / width * duration)
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)