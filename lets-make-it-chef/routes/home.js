//requiring express 

//where everything should be for login/signup. will configure other pages later
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home') //setting the path to the home.js in controller as homeController
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex) //when 
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)

module.exports = router