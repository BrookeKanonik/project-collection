//has the middleware contained
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error') //adding this as we are using it further down the file
// const { get } = require('../routes/places-routes')
const getCoordsForAddress = require('../util/location')


//have to move dummy data here as this is where we interact with it
let DUMMY_PLACES = [ //needs to be let as when we delete something we are updating the dummy data
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

const getPlacesByUserId = (req,res,next) => {
    const userId = req.params.uid
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })

    if(!places || places.length === 0) {
        // return res.status(404).json({message: 'Could not find a place for the provided user id!'})
        return next(new HttpError('Could not find places for the last user id', 404));
    }
    res.json({places})
}

const createPlace = async  (req, res, next) => { //expect to have data in the body 
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return next (new HttpError('Invalid inputs passed, please check your data', 422)) //cannot do throw if it is async code
    }
    const {title, description, coordinates, address, creator} = req.body //destructuring which does. used to have coordinates here
    
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

const updatePlace = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check your data', 422)
    }
    //for a patch request, you also have a body
    const {title, description} = req.body;
    //we need the id that needs to be updated as well 
    const placeId = req.params.pid;

    //need to create a copy so we need to use the spread operator. it will create a new object
    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)} //primitive and reference values allow us to change this constant stores the address of the object and not the object itself
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId) //need to find the index of the place we had
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({place: updatedPlace})
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    if (!DUMMY_PLACES.find(p=> p.id === placeId)){
        throw new HttpError('Could not find a place for that id', 404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => placeId !== p.id)
    res.status(200).json({message: 'deleted place'})
}
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

//might need to adjust more of data to work