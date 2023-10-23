const mongoose = require('mongoose') //setting up the criteria we will have. looking into what to do for ingredients (should it all be in one seperated by a comma or add a default if it is another field)

const RecipesSchema = new mongoose.Schema({
  ingredients: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Recipes', RecipesSchema)