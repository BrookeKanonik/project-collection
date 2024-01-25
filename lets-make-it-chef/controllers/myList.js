const Items = require('../models/Items')
const User = require('../models/User') 

module.exports = {
    // getMyList: (req,res)=>{
    //     res.render('myList.ejs')
    // },

    getItems: async (req,res)=>{
        console.log(req.user)
        // try{
        //     const listItems = await Items.find({userId:req.user.id})
        //     res.render('myList.ejs', {items: listItems,  user: req.user})
        // }catch(err){
        //     console.log(err)
        // }

        try{
            const listItems = await Items.find({user: req.user.id}).sort({createdAt: "asc"}).lean() //needs adjusting
            const userInfo = await User.find({ _id: req.user.id })
            console.log(userInfo)
            console.log('IS IT WORKING??? USERINFO ABOVE?')
            //const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) //needs adjusting
            res.render('myList.ejs', {items: listItems, user: req.user, info: userInfo})//, {todos: todoItems, left: itemsLeft, user: req.user}) //needs adjusting
            
        }catch(err){
            console.log(err)
        }
    },
    addItem: async (req, res)=>{
        try{
            await Items.create({item: req.body.groceryItem, completed: false, user: req.user.id,})
            console.log('Todo has been added!')
            res.redirect('/list') //fix to redirect to the page
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Items.findOneAndUpdate({_id: req.params.id},{
                completed: true
               
            })
            console.log('Marked Complete')
            res.redirect('/list')
            // res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Items.findOneAndUpdate({_id: req.params.id},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.redirect('/list')
            // res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteItem: async (req, res)=>{
        try{
            await Items.deleteOne({_id: req.params.id })
            console.log('Deleted Item')
            // res.json('Deleted It')
            res.redirect("/list");
        }catch(err){
            res.redirect("/list");
            console.log(err)
            // return;
        }
    }
}