const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ =>{ //we just want to do a fetch on click so that is why we have _ => in there
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
       
    }) 
    .then(res => { //fetch requires two thens in order to get a response from the server
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true) //reloads the response immediately instead of needing to refresh
    })  
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if(response === 'No quote to delete'){
            messageDiv.textContent = 'No Darth Vader quote to delete'
        }else {
            window.location.reload()
        }        
    })
})