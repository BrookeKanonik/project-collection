//requiring express 

//where everything should be for login/signup. will configure other pages later
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
// const myRecipesController = require('../controllers/myRecipes') 
const homeController = require('../controllers/home') //setting the path to the home.js in controller as homeController
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex) //when 
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
// router.get('/my-recipes', ensureAuth, myRecipesController.getMyRecipes) //works bc its here??? takes to homepage


module.exports = router