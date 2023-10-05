module.exports = { //next means the function that you call when youre done doing whatever you are doing to call the next piece of middleware
    ensureAuth: function (req, res, next){
        if (req.isAuthenticated()){
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next){
        if (req.isAuthenticated()){
            res.redirect('/')
        } else {
            return next()
        }
    }
}