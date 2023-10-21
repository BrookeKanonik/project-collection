//requiring express 

const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login') //setting the path to the home.js in controller as homeController

router.get('/', loginController.getLogin) //when 

module.exports = router