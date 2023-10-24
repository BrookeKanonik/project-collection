const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const addRecipeRoutes = require('./routes/addRecipe')

require('dotenv').config({path: './config/.env'})

//connectDB()

app.set('view engine', 'ejs') //making it ejs for the views
app.use(express.static('public')) //using our items in the public folder 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
//app.use('/todos', todoRoutes) //when clicked on in ejs will take them home
app.use('/login', loginRoutes) //when clicked on will take to loginRoutes
app.use('/signup', signupRoutes) //when clicked on will take to loginRoutes
app.use('/add-recipe', addRecipeRoutes) //will create to have users create recipes. first part of parameters is what the url will have. can make it whatever

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    