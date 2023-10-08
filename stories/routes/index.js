const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Story = require('../models/Story')

// @ descriptions Login/Landing page
// @ route GET /
router.get('/', ensureGuest, (req,res) => { //only a guest should be able to see this
    res.render('login', {
        layout: 'login', //added so we can see the card class
    }) //going to the views and rendering the information
})

// @ descriptions Dashboard
// @ route GET / dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
    try{
        const thirdstory = await Story.find({ title: "Brookes Third Story", user: req.user.id });
        console.log(thirdstory);
        console.log('thing');
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories //getting the first name to add to the dashboard
        })

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }

})

module.exports = router //we can run this in the app.js file

//in order to use this file we need to go to app.js and link our routing files