const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    room: String,
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //we are referencing a difference schema
    timestamp: {
        type: Date, 
        default: Date.now //if no value is passed, then it generates this
    }
})

module.exports = mongoose.model('Message', MessageSchema)