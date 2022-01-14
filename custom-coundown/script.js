const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

// countdown section
const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownElBtn = document.getElementById('countdown-button')

// complete section
const completeEl = document.getElementById('complete')
const completeElTitle = document.getElementById('complete-title')
const completeElInfo = document.getElementById('complete-info')
const completeElBtn = document.getElementById('complete-button')

const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')

// set date ip with today date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)
// dateEl.setAttribute('value', today)

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

function updateDom(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now
        // console(distance)
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        inputContainer.hidden = true


        // if the coundown has ended, show complete section
        if(distance < 0){
            completeEl.hidden =true
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} Finished On ${countdownDate}`
            completeEl.hidden = false
        }else{
            countdownElTitle.textContent = `${countdownTitle}`
            daysEl.textContent = days
            hoursEl.textContent = hours
            minutesEl.textContent = minutes
            secondsEl.textContent = seconds
            completeEl.hidden = true
            countdownEl.hidden = false
        }

    }, second)
}

// form values
function updateCountdown(e){
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountDown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountDown))
    // console.log(countdownTitle)
    // console.log(countdownDate)
    // get number version of current
    if(countdownDate === ''){
        alert('Please select date.')
    }else{
        countdownValue = new Date(countdownDate).getTime()
        updateDom()
    }
}


// reset call
function resetCall(){
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false
    clearInterval(countdownActive)
    countdownTitle = ''
    countdownDate = ''
}


function restorePreviousCountdown(){
    // get count down from local storage
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true
        savedCountdown = JSON.parse((localStorage.getItem('countdown')))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDom()
    }
}


// event listerners
countdownForm.addEventListener('submit', updateCountdown)
countdownElBtn.addEventListener('click', resetCall)
completeElBtn.addEventListener('click', resetCall)

restorePreviousCountdown()