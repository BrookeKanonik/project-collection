const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const addRecipeRoutes = require('./routes/addRecipe')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs') //making it ejs for the views
app.use(express.static('public')) //using our items in the public folder 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
//app.use('/todos', todoRoutes) //when clicked on in ejs will take them home
app.use('/login', loginRoutes) //when clicked on will take to loginRoutes
app.use('/signup', signupRoutes) //when clicked on will take to loginRoutes //may need to get rid of in future
app.use('/add-recipe', addRecipeRoutes) //will create to have users create recipes. first part of parameters is what the url will have. can make it whatever //may need to get rid of in future

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    