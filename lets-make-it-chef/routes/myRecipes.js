// requiring express 

const express = require('express')
const router = express.Router()
const myRecipesController = require('../controllers/myRecipes') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth,  myRecipesController.getMyRecipes) 
router.delete('/deletePost/:id', myRecipesController.deleteRecipe)
//router.post('/createRecipe', myRecipesController.createMyRecipes)
//ENSURE AUTH IS CURRENTLY RETURNING TO THE HOMEPAGE WHEN USER LOGS IN, SEE WHY THIS IS, IS IT THEY ARENT ENSUREDAUTH AND IS EDFAULT DIRECTING THEM HOME??
module.exports = router