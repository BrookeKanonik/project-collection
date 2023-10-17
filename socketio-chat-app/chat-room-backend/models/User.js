const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, //This should NEVER be plaintext! this was hashed in the server
});

module.exports = mongoose.model('User', UserSchema);

//schema can make these items required! 
//client side can make those items in the form required and can also do it in the schema