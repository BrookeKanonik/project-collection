const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const signupController = require('../controllers/signup') //setting the path to the home.js in controller as homeController

router.get('/', signupController.getSignup) //when 
router.post('/', authController.postSignup) //removed signup from the post route

module.exports = router