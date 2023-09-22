//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://api.nasa.gov/planetary/apod?api_key=XfzMI5dG1k7ISgeB7NcaFeacCgyzSuT4CXxUQq60&date=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (data.media_type){

          if (data.media_type === 'image'){
            document.querySelector('img').src = data.url
            document.querySelector('img').classList.remove('visible') 
            document.querySelector('iframe').classList.add('visible')
          } else if (data.media_type === 'video') {
            document.querySelector('iframe').src = data.url
            document.querySelector('iframe').classList.remove('visible') 
            document.querySelector('img').classList.add('visible')
          }
          
          document.querySelector('h3').innerText = data.explanation

        } else {
          document.querySelector('iframe').classList.add('visible') 
          document.querySelector('img').classList.add('visible')
          document.querySelector('h3').innerText = 'Please enter a past or current date'
        }
     
      })
      .catch(err => {
          console.log(`error ${err}`)
         
      });
}

