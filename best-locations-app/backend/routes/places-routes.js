const express = require('express');
const placesControllers = require('../controllers/places-controller')
const HttpError = require('../models/http-error.js')
const router = express.Router(); //gives us an object that lets us register middleware and can export configured routers




//look at route orders!! 
router.get('/:pid', placesControllers.getPlaceById)

router.get('/user/:uid', placesControllers.getPlaceByUserId)

router.post('/', placesControllers.createPlace)

module.exports = router; //exporting the file as the name router 

//all this will be going to places-controller.js