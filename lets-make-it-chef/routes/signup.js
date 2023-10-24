const express = require('express')
const router = express.Router()
const signupController = require('../controllers/signup') //setting the path to the home.js in controller as homeController

router.get('/', signupController.getSignup) //when 

module.exports = router