const bookmarkForm = document.getElementById('bookmark_form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')


function storeBookMark(e){
    e.preventDefault()
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if(!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`
    }
    
}

// event listeners
bookmarkForm.addEventListener('submit', storeBookMark)

