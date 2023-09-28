const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb') //pulling out these objects that we need from mongodb
require('dotenv').config()
const PORT = 8000 //where our backend is at 

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix', //find the data base name
    collection

MongoClient.connect(dbConnectionStr) //connect to this cluster and checks if you have access
    .then(client => {
        console.log('connected to the database')
        db = client.db(dbName)
        collection = db.collection('movies')
    })

//adding middleware to handle messages
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get("/search", async (request, response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query" : `${request.query.query}`,
                        "path" : "title",
                        "fuzzy" : {
                            "maxEdits" : 2, //make two substitutions (two character mistakes) in the search bar
                            "prefixLength" : 3 //3 characters and then it will start to autocomplete
                        }
                    }
                }
            }
        ]).toArray()
        response.send(result)
        console.log(result)
    } catch (error){
        response.status(500).send({message: error.message})
        console.log(error)
    }
})

app.get("/get/:id", async (request, response)=> {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id) //passing an id within the url 
        })
        response.send(result)
        console.log('findingone')
    }catch (error){
        response.status(500).send({message: error.message})
        console.log('error')
    }
})   //:id is a paramater which is the id of the object we want to bring back

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running')
})
