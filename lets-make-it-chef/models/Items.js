const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // userId: {
  //   type: String,
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

module.exports = mongoose.model('Items', ItemsSchema)