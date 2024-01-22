const Items = require('../models/Items')

module.exports = {
    // getMyList: (req,res)=>{
    //     res.render('myList.ejs')
    // },

    getItems: async (req,res)=>{
        console.log(req.user)
        try{
            const listItems = await Items.find({userId:req.user.id})
            res.render('myList.ejs', {items: listItems,  user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    addItem: async (req, res)=>{
        try{
            await Items.create({item: req.body.groceryItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/list') //fix to redirect to the page
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Items.findOneAndUpdate({_id:req.body.itemIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Items.findOneAndUpdate({_id:req.body.itemIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteItem: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Items.findOneAndDelete({_id:req.body.itemIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}