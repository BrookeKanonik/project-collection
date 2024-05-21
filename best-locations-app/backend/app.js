const express = require('express') //require a package then store it in a variable
const bodyParser = require('body-parser') //parse body of incoming requests

const placesRoutes = require('./routes/places-routes')
const HttpError = require("./models/http-error")
// const userRoutes = require('./routes/users-routes')
const app = express();

//we want to add a new middleware for body parser bc of createPlace
app.use(bodyParser.json()); //parse any incoming request. call next automatically.

app.use('/api/places', placesRoutes) //request starts with /api/places... we need a path filter 
// app.use('api/users', userRoutes)

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    throw error;
})

//error handling middleware
app.use((error, req, res, next) => { //4 params = first will be an error
    if(res.headerSent){ //check if a response has already been sent
        return next(error);
    }
    res.status(error.code || 500 ); //500 is something is wrong on the server
    res.json({message: error.message || 'An unknown error has occurred'});
})


app.listen(5000);