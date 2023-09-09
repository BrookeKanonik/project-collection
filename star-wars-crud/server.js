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
    const quotesCollection = db.collection('quotes') //naming the collection quotes 
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true})) //HAS to be before crud handlers
    app.use(express.static('public')) 
    app.use(bodyParser.json())
    app.get('/', (req,res) => { //instead of function (req,res){ } we can do an arrow function 
        quotesCollection.find().toArray() //looking at the quotes collection and making it an array
            .then(results => { //research more on promises and why this should be here 
                console.log(results)
                res.render('index.ejs', { quotes: results }) //in the get, getting the data and rendering it. it will be in the index.ejs under the form tags
            })
            .catch(error => console.error(error))
        //res.send('Hello, World!') //send is writing hello world back to the browser 
        //res.sendFile(__dirname + '/index.html') //__dirname is directory name and where to grab the index.html file to serve it up
        //res.render('index.ejs', {}) //moving this into the promise .then statement
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body) //.body is because of bodyParser??
            .then(result => { //.then is a promise 
                console.log(result)
                res.redirect('/') //going to redirect us home so we can make another entry if we want to/ stops the loading spinner from appearing.

            })
            .catch(error => console.error(error))
        //console.log(req.body) //when you submit the form this should populate in the terminal 
    }) //grabbing the quotes path that was in the HTML
    app.put('/quotes', (req, res)=> {
       quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          }
        },
        {
          upsert: true //if no documents (yoda quotes) can be found, add another darth vader quote
        }
        
       )
        .then(result => {
            console.log(result)
            res.json('Success') //need to respond to the put request 
        })
        .catch(error => console.error(error))
    })
    app.delete('/quotes', (req,res)=> {
        quotesCollection.deleteOne(
        {name: req.body.name}, //or we could put 'Darth Vader' if we so choose. It recognizes it from the fetch request so we can do req.body.name
        )
        .then(result => {
            if(result.deletedCount === 0){
                return res.json('No quote to delete') //sends a response and in the main.js will respond with text content if it is true
            }
            res.json('Deleted Darth Vader\'s quote')
        })
        .catch(error => console.error(error))



    })
    app.listen(3000, function() { //app.listen is ensuring it is running on our 3000 port 
        console.log('listening on 3000')
    }) 
  })
  .catch(error => console.error(error))






