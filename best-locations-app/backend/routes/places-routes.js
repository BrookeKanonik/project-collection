const express = require('express');
const {check} = require('express-validator') //we are just taking the check property from the library, hence the destructuring
const placesControllers = require('../controllers/places-controller')
const HttpError = require('../models/http-error.js')
const router = express.Router(); //gives us an object that lets us register middleware and can export configured routers




//look at route orders!! 
router.get('/:pid', placesControllers.getPlaceById)

router.get('/user/:uid', placesControllers.getPlacesByUserId)

router.post(
    '/', 
    [    
        check('title')
        .not()
        .isEmpty(),
        check('description').isLength({min: 5}),
        check('address')
        .not()
        .isEmpty()
    ],
    placesControllers.createPlace
)

router.patch(
    '/:pid', 
    [    
        check('title')
        .not()
        .isEmpty(),
        check('description').isLength({min: 5})
    ],
    placesControllers.updatePlace)

router.delete('/:pid', placesControllers.deletePlace)

module.exports = router; //exporting the file as the name router 

//all this will be going to places-controller.js