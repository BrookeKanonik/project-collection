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

// @ descriptions show single story
// @ route GET /stories/:id
router.get('/:id', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try {
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()

    if (!story){
        return res.render('error/404')
    }
    res.render('stories/show', {
        story
    })
    }catch (err){
        console.error(err)
        res.render('error/404')
    }
})


// @ descriptions show edit page
// @ route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try {
        const story = await Story.findOne({
          _id: req.params.id,
        }).lean()
    
        if (!story) {
          return res.render('error/404')
        }
        //redirect if not the story owner to the stories page
        if (story.user != req.user.id) {
          res.redirect('/stories')
        } else {
          res.render('stories/edit', {
            story,
          })
        }
      } catch (err) {
        console.error(err)
        return res.render('error/500')
      }
    })
// @ descriptions update story
// @ route  PUT/stories/:id
router.put('/:id', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try {
        let story = await Story.findById(req.params.id).lean()
    
        if (!story) {
          return res.render('error/404')
        }
    
        if (story.user != req.user.id) {
          res.redirect('/stories')
        } else { //second param is what we are replacing it with
          story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
          })
    
          res.redirect('/dashboard')
        }
      } catch (err) {
        console.error(err)
        return res.render('error/500')
      }
    })

// @ descriptions delete story
// @ route DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try {
        await Story.deleteOne({ _id: req.params.id})
        res.redirect('/dashboard')
    }catch (err){
        console.error(err)
        return res.render('error/500')
    }
})

// @ descriptions user stories
// @ route GET /stories/user/:userId

//going to the homepage and clicking the user to only show stories by that user
router.get('/user/:userId', ensureAuth, async (req,res) => { //only a guest should be able to see this
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public',
        })
        .populate('user')
        .lean()

        res.render('stories/index', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router //we can run this in the app.js file

//in order to use this file we need to go to app.js and link our routing files

