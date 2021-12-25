const quoteText = document.getElementById('quote-text')
const quotediv = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const quoteTwitterbtn = document.getElementById('twitter')
const newQuote = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function GenerateQuote(params) {
    loader.classList.remove('d-none')
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // const quote = Quotes[Math.floor(Math.random() * Quotes.length)]
    quoteText.textContent = quote.text

    if(quote.author == null){
        quoteAuthor.textContent = 'Unknown'
    }else{
        quoteAuthor.textContent = quote.author
    }
    // check quote length is above 120 add new claass
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote')
    }
    loader.classList.add('d-none')
}

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const reponse = await fetch (apiUrl)
        apiQuotes = await reponse.json()
        GenerateQuote()
    }catch(error){
        // catch error
    }
}

getQuotes()


// Tweeet quote
function tweetQuote(){
    const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(url, '_blank')
}

// event listeners
quoteTwitterbtn.addEventListener('click', tweetQuote)
newQuote.addEventListener('click', getQuotes)