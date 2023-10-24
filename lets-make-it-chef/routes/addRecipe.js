//requiring express 

const express = require('express')
const router = express.Router()
const addRecipeController = require('../controllers/addRecipe') //setting the path to the home.js in controller as homeController
//const { ensureAuth } = require('../middleware/auth')
//destructured --- look up it is destructured because we could have guest accounts and different kinds of users (possibly)

router.get('/', addRecipeController.getAddRecipe) //when  //WILL NEED TO ADD ENSUREAUTH ONCE LOGIN IS COMPLETE
router.post('/addRecipe', addRecipeController.addRecipe) //what will happen when someone posts a recipe

module.exports = router