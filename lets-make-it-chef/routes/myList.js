// requiring express 

const express = require('express')
const router = express.Router()
const myListController = require('../controllers/myList') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth,  myListController.getMyList) 
router.post('/addItem', myListController.addItem)
//router.post('/createRecipe', myRecipesController.createMyRecipes)
//ENSURE AUTH IS CURRENTLY RETURNING TO THE HOMEPAGE WHEN USER LOGS IN, SEE WHY THIS IS, IS IT THEY ARENT ENSUREDAUTH AND IS EDFAULT DIRECTING THEM HOME??
module.exports = router