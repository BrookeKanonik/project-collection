const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan') //any request to a page it will show that in the console
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session =  require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

//Load config
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport) //can pass in the argument of the passport that we just brought in

connectDB()

const app = express()

// body parser middleware to be able to take info from the body of the form in stories.js
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')) //shows the HTTP method, response, etc in the console
}

//handlebar helpers

const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs.js')

//handlebars

app.engine(
    '.hbs',
    exphbs.engine({ //needs .engine after exphbs for it to work
    //   helpers: {
    //     formatDate,
    //     stripTags,
    //     truncate,
    //     editIcon,
    //     select,
    //   },
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
      
    })
  )
  app.set('view engine', '.hbs') //to go to the views?

//sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false, //do not want to save a session if nothing is modified
    saveUninitialized: false, //dont create a session until something is stored  
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  })
)


//set the passport middleware
app.use(passport.initialize())
app.use(passport.session()) //need express session to have this work


//set global variable
app.use(function (req, res, next){
  // are able to access user within our templates
  res.locals.user = req.user || null
  next()
})

//Static folder
app.use(express.static(path.join(__dirname, 'public'))) //current directory and then go into the public one

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Running in ${process.env.NODE_ENV} on port ${PORT}`))

