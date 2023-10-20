//requiring express 

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home') //setting the path to the home.js in controller as homeController

router.get('/', homeController.getIndex) //when 

module.exports = router