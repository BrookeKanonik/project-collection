const express = require('express');
const usersControllers = require('../controllers/users-controller')
// const HttpError = require('../models/http-error.js')
const router = express.Router(); //gives us an object that lets us register middleware and can export configured routers




//look at route orders!! 
router.get('/', usersControllers.getUsers)

router.post('/signup', usersControllers.signup)

router.post('/login', usersControllers.login)

module.exports = router; //exporting the file as the name router 

//all this will be going to places-controller.js