const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav')
const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const toggletext = document.getElementById('toggletext')
const toggleicon = document.getElementById('toggleicon')


function darkmode(){
    toggletext.textContent = 'Dark Mode'
    toggleicon.classList.remove('fa-sun')
    toggleicon.classList.add('fa-moon')
    img1.src = './img/1_light.svg'
    img2.src = './img/2_light.svg'
    img3.src = './img/3_light.svg'
}

function lightmode(){
    toggletext.textContent = 'Light Mode'
    toggleicon.classList.remove('fa-moon')
    toggleicon.classList.add('fa-sun')
    img1.src = './img/1_dark.svg'
    img2.src = './img/2_dark.svg'
    img3.src = './img/3_dark.svg'
}

// switch theme dynamically
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark')
        darkmode()
        localStorage.setItem('theme', 'dark')
    }else{
        document.documentElement.setAttribute('data-theme', 'light')
        lightmode()
        localStorage.setItem('theme', 'light')
    }
}

// event listeners
toggleSwitch.addEventListener('change', switchTheme)

const currentTheme = localStorage.getItem('theme')
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme)
    if(currentTheme === 'dark'){
        toggleSwitch.checked = true
        darkmode()
    }
}