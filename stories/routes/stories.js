const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

const Story = require('../models/Story')

// @ descriptions show add page
// @ route GET /stories/add
router.get('/add', ensureAuth, (req,res) => { //only a guest should be able to see this
    res.render('stories/add') 
})

// @ descriptions process the add form
// @ route POST /stories
router.post('/', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try{
        req.body.user = req.user.id 
        await Story.create(req.body)//in order to use req.body we need to add something to our middleware
        res.redirect('/dashboard')
    } catch (err){
        
        console.error(err)
        res.render('error/500')
    }
})

// @ descriptions show all stories
// @ route GET /stories 
router.get('/', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try{
        const stories = await Story.find({status: 'public'}) //we will only show the stories that are public
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean() //need .lean so we can pass this into our template
        res.render('stories/index', {
            stories, //we want to pass in stories into this render
        })
    }catch(err){
        console.error(err)
        res.render('error/500')
    }
})


module.exports = router //we can run this in the app.js file

//in order to use this file we need to go to app.js and link our routing files

