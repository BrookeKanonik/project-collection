const mongoose = require('mongoose') //setting up the criteria we will have. looking into what to do for ingredients (should it all be in one seperated by a comma or add a default if it is another field)

const RecipesSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
  },
  // amount: {
  //   type: String,
  //   required: true,
  // },
  instructions: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // userId: {
  //   type: String,
  //   required: true
  // } //ingredients and amounts may be duplicates in the future... need to figure out
})

module.exports = mongoose.model('Recipes', RecipesSchema)