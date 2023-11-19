const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) //for session cookies
const methodOverride = require("method-override");
const flash = require('express-flash') //storimg sessions in db
const logger = require('morgan') //shows terminal history
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const addRecipeRoutes = require('./routes/addRecipe')
const myRecipeRoutes = require('./routes/myRecipes')
const myListRoutes = require('./routes/myList')

require('dotenv').config({path: './config/.env'}) //use env and where to find it 

// Passport config
require('./config/passport')(passport)

connectDB()  

app.set('view engine', 'ejs') //making it ejs for the views
app.use(express.static('public')) //using our items in the public folder 
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //pull things we need out of requests aka forms for example
app.use(logger('dev')) //set up morgan to run

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'keyboard cat', //can change later
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) //setting up alerts for login/signup

app.use('/', homeRoutes)
app.use('/login', loginRoutes) //when clicked on will take to loginRoutes
app.use('/signup', signupRoutes) //when clicked on will take to loginRoutes //may need to get rid of in future
app.use('/add-recipe', addRecipeRoutes) //will create to have users create recipes. first part of parameters is what the url will have. can make it whatever //may need to get rid of in future
app.use('/my-recipes', myRecipeRoutes)
app.use('/list', myListRoutes)
//is before the current error i am having. GET /my-recipes showing as 500

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    