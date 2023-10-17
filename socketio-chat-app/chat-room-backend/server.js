// Importing required modules
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const ChatRoom = require('./models/ChatRoom');
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcrypt'); // For password hashing

const app = express()
const server = http.createServer(app) //we also need a place for the web socket traffic to travel to

const io = socketIO(server, {
    cors: {
        origin: "*"
    },
})

app.use(express.json()) //used when we have a form
app.use(cors()) //insert itself in messages as they travel back and forth

// MongoDB Atlas connection URI
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qhzllyz.mongodb.net/chat_app?retryWrites=true&w=majority`

// Connect to MongoDB Atlas, can change to async await after finished. want to test other ways to write this
mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch((error) => {
    console.log('MongoDB Atlas connection error:', error);
  });

io.on('connection', (socket) => { //once someone connects, this message will upload
    console.log('New Client Connected!')
    socket.on('joinRoom', async ({room}) => {
        socket.join(room) //essentially putting that client into a group of people that the socket identifies is in that particular room. any messages meant for that room will be sent to that group of people

        const messages = await Message.find({room}) //hit up db, await and look in the message collection and see what messages we can find for that particular room. will have a room variable for each document in mongo
        .sort({timestamp: -1}) //desc order
        .limit(15) //only get the 15 most recent messages
        .populate('user', 'username') //there is a user field already, subsitute username field instead so it is easier on the client. is an objectid in the database for user

        socket.emit('previousMessages', messages) //broadcast
    })

    socket.on('sendMessage', async ({room, message, userId}) => {
        const user = await User.findById(userId)

        if(!user){
            return
        }

        const newMessage = new Message({
            room, //same as room : room,
            content: message,
            user: userId, 
        })

        await newMessage.save();

        await newMessage.populate('user', 'username')

        io.to(room).emit('newMessage', newMessage) //update only to those who are in the room
    }) //when someone types a message and sends it

    socket.on('disconnect', () => {
        console.log('Client Disconnected :(')
    }) //can be deleted once we go live but used for testing
})

app.post('/register', async (req, res)=> { 
    const {username, email, password} = req.body //destructoring data from the requests body
    const hashedPassword = await bcrypt.hash(password, 10) //hash the password 
    const user = new User({username, email, password: hashedPassword}) //hashed password will be stored
    await user.save()
    const token = jwt.sign({userId: user._id}, 'your-secret-key') //generating the token since they are a new user at register. the basis for the token would be the user Id, you would also have a secret key usually but it wont be used in this project
    res.send({token,username})
})

app.post('/login', async (req, res)=> { 
    const {username, password} = req.body //destructoring data from the requests body
    const user = await User.findOne({username}) //dup username needs to be added for registration route
    if (!user){
        return res.status(404).send('User Not Found')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        return res.status(400).send('Invalid Password')
    }

    const token = jwt.sign({userId: user._id}, 'your-secret-key') 
    res.send({token,username})
})

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000')
})

// can add chatrooms to maybe have users create private chatrooms?? notes for a future project