const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

//we passed passport into this file via app.js, so we can pass it in below
module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    }, 
    async (accessToken, refreshToken, profile, done) => {
       // console.log(profile) //when clicking on a user with google auth, you can see the profile of the person while it is stuck in loading since there was no return
       const newUser = {
            googleId: profile.id,//has to match with the Schema that we created
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
       }
       try {
        let user = await User.findOne({ googleId: profile.id}) //because we are using mongoose. checking to see if we already have a profile for that individual
        if (user) {
            done(null, user) //null is the error and we want to pass the user in
        } else {
            user = await User.create(newUser) //if it does not exist, then we are going to create a new user
            done(null, user)
        }
        } 
        
        catch (err) {
            console.error(err)
        }
    
        }
    
   
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    //or the above can be written as 
    // passport.serializeUser(function(user,done){
    //     done(null, user.id)
    // })
    
    //   passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => done(err, user))
    // }) NO LONGER USED AS A CALLBACK BY MONGOOSE

    passport.deserializeUser(async (id, done) => {
        done(null, await User.findById(id))
    })

}