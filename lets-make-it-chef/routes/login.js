// requiring express 

const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const loginController = require('../controllers/login') //setting the path to the home.js in controller as homeController
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', loginController.getLogin) //when 
// router.get('/login', authController.getLogin)
router.post('/', authController.postLogin) //removed /login from the post route
// router.get('/signup', authController.getSignup)
// router.post('/signup', authController.postSignup)


module.exports = router