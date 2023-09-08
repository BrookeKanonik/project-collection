console.log('may node be with you all and also with you')

const express = require('express');
const bodyParser = require('body-parser') //bodyParser is a depricated code, may want to go back later to fix it 
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://brookekanonik:PLrpnrA20ahTbBNZ@cluster0.gzlgdjj.mongodb.net/?retryWrites=true&w=majority'



MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('star-wars-quotes'); //does not matter the name of the db 
    app.use(bodyParser.urlencoded({ extended: true})) //HAS to be before crud handlers
    app.get('/', (req,res) => { //instead of function (req,res){ } we can do an arrow function 
        //res.send('Hello, World!') //send is writing hello world back to the browser 
        res.sendFile(__dirname + '/index.html') //__dirname is directory name and where to grab the index.html file to serve it up
    
    })
    app.post('/quotes', (req, res) => {
        console.log(req.body) //when you submit the form this should populate in the terminal 
    }) //grabbing the quotes path that was in the HTML
    app.listen(3000, function() { //app.listen is ensuring it is running on our 3000 port 
        console.log('listening on 3000')
    }) 
  })
  .catch(error => console.error(error))






