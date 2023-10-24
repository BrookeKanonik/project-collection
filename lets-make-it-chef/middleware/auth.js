module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) { //are they logged in?
        return next() //if logged in, continue doing what we are doing
      } else {
        res.redirect('/') //but if there was no one logged in, take them back to the main page
      } //may change to redirect them to the login page
    }
  }
  
//exports an object that has a method (function in an object) -- telling the function to run and the get request can be looked at. since passport is running, we can see if someone is logged in or if there is a session for the logged in user 