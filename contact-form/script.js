const form = document.querySelector("form")
statusTxt = form.querySelector(".button-area span")

form.onsubmit = (e) => { //when we click the submit button...
     e.preventDefault(); //prevent form from submitting 
     statusTxt.style.color = "grey";
     statusTxt.style.display ="block"; //once the button is submitted show the message
     statusTxt.innerHTML = "Sending your message...";

     let xhr = new XMLHttpRequest(); //create new xml object
     xhr.open("POST", "message.php", true); //sending post request to message.php file 
     xhr.onload = () => { //once ajax loaded
        if (xhr.readyState == 4 && xhr.status == 200){ //if ajax response status is 200 and ready status is 4 that means there is no error 
            let response = xhr.response;
            //for errors we will change the color to be red
            if (response.indexOf('Email and password field is required!') != -1 || response.indexOf('Enter a valid email address!') || response.indexOf('Sorry, failed to send your message!')){
                statusTxt.style.color = "red";
            }else{
                form.reset();
                setTimeout(() => {
                    statusTxt.style.display ="none";
                }, 3000)
            }
            //console.log(response); //response can also link to the message.php in our if statements
            statusTxt.innerHTML = response;
        }
     }
     let formData = new FormData(form); //creating a new FormData object that is used to send form data
     xhr.send(formData); //sending form data 

}
