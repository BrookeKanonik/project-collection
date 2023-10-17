const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({ //defining the blueprint
  name: String, //name of the room 
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema); //giving the model a name will name the collection where we are writing these documents
//.model takes 3 parameters where the last can be the name of the collection, otherwise mongoose will just name it what the first parameter is but with an s at the end