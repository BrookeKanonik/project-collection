const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// Get quotes from API
// let apiQuotes = []; 

// Show New Quote

function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;   
}

//Hide Loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    //Pick a random quote from API quotes array

    const quote = localQuotes[Math.floor(Math.random()* localQuotes.length)] //replace localQuotes with apiQuotes if I want to change it back
    //Check if author field is blank and replace it with 'Unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
    }

    //Check quote length

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    //Set Quote and Hide Loader

    quoteText.textContent = quote.text
    complete();
}

// async function getQuotes() {
//     const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json' 
//     try {
//         const response = await fetch(apiUrl) //respone will not populate until we have some data from the apiUrl. would cause an error if it was not an await.
//         apiQuotes = await response.json();
//         newQuote();

//     } catch (error) {
//         //Catch the error here
//     }
// }

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank'); //opens the twitter page in a new tab
}

//Event Listeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//On Load

// getQuotes();



newQuote()
