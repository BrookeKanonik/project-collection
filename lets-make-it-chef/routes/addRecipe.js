//requiring express 

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/addRecipe') //setting the path to the home.js in controller as homeController

router.get('/', homeController.getAddRecipe) //when 

module.exports = router