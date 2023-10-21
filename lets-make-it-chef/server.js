const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')

require('dotenv').config({path: './config/.env'})

//connectDB()

app.set('view engine', 'ejs') //making it ejs for the views
app.use(express.static('public')) //using our items in the public folder 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
//app.use('/todos', todoRoutes)
app.use('/login', loginRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    