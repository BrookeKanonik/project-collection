const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

  exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/my-recipes')
    }
    res.render('login', {
      title: 'Login'
    })
  }

  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors) //flash the errors on the pages 
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => { //current error is with unknown authentication strategy "local"
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/my-recipes')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/my-recipes')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = async (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    } //if anything is wrong, errors will show with a redirect to the page again
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    try{
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      });
    
      const existingUser = await User.findOne({$or: [
        {email: req.body.email},
        {userName: req.body.userName}
      ]});
      console.log(existingUser);
      if(!existingUser) {
        await user.save(); //saves in db 
        req.logIn(user, (err) => { //start added
          if (err) {
            console.log('ITS NOT WORKING! AUTH.JS')
            return next(err)
          }
          console.log('WORKING?? AUTH.JS')
          res.redirect('/my-recipes')
        }) //end added
        //res.redirect('/my-recipes'); //returns to homepage but should soon be their recipes

      } else {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        res.redirect('../signup');
      }

    }catch(err){
      console.log(err);
    }
    
    //CURRENT ERROR: COMPARE TODO WITH MY-RECIPE ROUTES AS WITH ENSUREAUTH WE ARE GOING BACK TO THE HOMEPAGE
    

    // User.findOne({$or: [
    //   {email: req.body.email},
    //   {userName: req.body.userName}
    // ]}, (err, existingUser) => {
    //   if (err) { return next(err) }
    //   if (existingUser) {
    //     req.flash('errors', { msg: 'Account with that email address or username already exists.' })
    //     return res.redirect('../signup')
    //   }
    //   user.save((err) => {
    //     if (err) { return next(err) }
    //     req.logIn(user, (err) => {
    //       if (err) {
    //         return next(err)
    //       }
    //       res.redirect('/home')
    //     })
    //   })
    // })
  }
