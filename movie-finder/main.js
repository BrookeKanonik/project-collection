$(document).ready(function () { //tell the input box we want it to be an autocomplete box
    $('#title').autocomplete({
        source: async function (request, response){
            let data = await fetch(`http://localhost:8000/search?query=${request.term}`) //going to the backend to get our info
                            .then(results => results.json())
                            .then(results => results.map(result => {
                                return {
                                    label: result.title,
                                    value: result.title,
                                    id: result._id
                                }
                            }))
                            
                            response(data)
                           
        }, 
        minLength: 2,
        select: function(event, ui){ //once a movie is selected, we are placing the information in the html through jquery
            console.log(ui.item.id)
            fetch(`http://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    $('#cast').empty()
                    console.log(result)
                    result.cast.forEach(cast => {
                        $('#cast').append(`<li>${cast}</li>`)
                    })
                    $('img').attr('src', result.poster) //adding the poster link
                })
        }
    }        
    )
}

)