const express = require('express')
const passport = require('passport')
const router = express.Router()

// @ descriptions Authenticate with google
// @ route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// @ descriptions auth callback
// @ route GET / auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req,res) => {
    res.redirect('/dashboard') //if it fails, take them to the homepage, otherwise take them to the dashboard
})

// @desc logout user
// @route /auth/logout

//req.logout is now asynchronous which means the below code needs to be added instead of the previous one (commented out for reference)
router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })

//   app.post('/logout', function(req, res, next) {
//     req.logout();
//     res.redirect('/');
//   });

module.exports = router //we can run this in the app.js file

//in order to use this file we need to go to app.js and link our routing files