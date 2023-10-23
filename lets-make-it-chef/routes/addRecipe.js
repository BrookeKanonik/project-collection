//requiring express 

const express = require('express')
const router = express.Router()
const addRecipeController = require('../controllers/addRecipe') //setting the path to the home.js in controller as homeController

router.get('/', addRecipeController.getAddRecipe) //when 
router.post('/addRecipe', addRecipeController.addRecipe)

module.exports = router