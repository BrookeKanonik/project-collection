//has the middleware contained
const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error') //adding this as we are using it further down the file
// const { get } = require('../routes/places-routes')


//have to move dummy data here as this is where we interact with it
const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'title one',
        description: 'its the first one',
        location: {
            lat: 40.74324,
            lng: -73.98
        },
        address: '20 something',
        creator: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid //params holds an object where dynamic is held as keys and the values
    const place =DUMMY_PLACES.find(p => { //array finding in the dummy places the id that matches the url for pid
        return p.id === placeId;
    })

    if(!place) {
        throw new HttpError('Could not find a place for provided id', 404);
      
        //throw error = no need to return but for next(error) you need to return
    }
    res.json({place}); //same as place: place
}

const getPlaceByUserId = (req,res,next) => {
    const userId = req.params.uid
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })

    if(!place) {
        // return res.status(404).json({message: 'Could not find a place for the provided user id!'})
        return next(new HttpError('Could not find a place for the last user id', 404));
    }
    res.json({place})
}

const createPlace = (req, res, next) => { //expect to have data in the body 
    const {title, description, coordinates, address, creator} = req.body //destructuring which does
    //const title = req.body.title;
    const createdPlace = {
        id: uuidv4(),
        title: title,
        description: description,
        location: coordinates, 
        address: address,
        creator: creator
    };

    DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

    res.status(201).json({place: createdPlace})
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;