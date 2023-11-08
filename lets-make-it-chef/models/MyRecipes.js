//NOT CURRENTLY USING

const mongoose = require('mongoose')

const MyRecipesSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  } //ingredients and amounts may be duplicates in the future... need to figure out
})

module.exports = mongoose.model('MyRecipes', MyRecipesSchema)